import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";

export async function imageToBase64(imgBlock) {
  if (!imgBlock) return "";

  // If already a URL string
  if (typeof imgBlock.content === "string") return imgBlock.content;

  const fileOrBlob = imgBlock.file || imgBlock.blob;
  if (fileOrBlob instanceof Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(fileOrBlob);
    });
  }

  console.warn("Image block is not a Blob or URL:", imgBlock);
  return "";
}

// Convert an image block to Uint8Array for docx
async function getImageBytes(imgBlock) {
  // Case 1: File or Blob object
  const fileOrBlob = imgBlock.file || imgBlock.blob;
  if (fileOrBlob instanceof Blob) {
    return new Uint8Array(await fileOrBlob.arrayBuffer());
  }

  // Case 2: Data URL (base64)
  if (
    typeof imgBlock.content === "string" &&
    imgBlock.content.startsWith("data:")
  ) {
    const base64Str = imgBlock.content.split(",")[1];
    const binaryString = window.atob(base64Str);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // Case 3: Blob URL (blob:)
  if (
    typeof imgBlock.content === "string" &&
    imgBlock.content.startsWith("blob:")
  ) {
    const response = await fetch(imgBlock.content);
    const blob = await response.blob();
    return new Uint8Array(await blob.arrayBuffer());
  }

  console.warn("Cannot get bytes for image:", imgBlock);
  return new Uint8Array(0);
}

// Export blocks to DOCX
export async function exportBlocksToDocx(blocksData) {
  // Build the children array first
  const sectionChildren = [];

  for (const block of blocksData) {
    switch (block.type) {
      case "heading":
        sectionChildren.push(
          new Paragraph({
            text: block.content || "",
            heading: HeadingLevel.HEADING_2,
          })
        );
        break;

      case "paragraph":
        sectionChildren.push(new Paragraph(block.content || ""));
        break;

      case "quote":
        sectionChildren.push(
          new Paragraph({
            text: block.content || "",
            italics: true,
            indent: { left: 720 },
          })
        );
        break;

      case "list": {
        const items = (block.content || "").split(",");
        items.forEach((i) =>
          sectionChildren.push(new Paragraph({ text: i, bullet: { level: 0 } }))
        );
        break;
      }

      case "code":
        sectionChildren.push(
          new Paragraph({
            text: block.content || "",
            spacing: { before: 100, after: 100 },
            shading: { fill: "f3f3f3" },
            font: "Courier New",
          })
        );
        break;

      case "link":
        sectionChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: block.content || "",
                style: "Hyperlink",
                color: "0000FF",
                underline: {},
              }),
            ],
          })
        );
        break;

      case "image":
        if (block.file || block.blob || block.content) {
          const bytes = await getImageBytes(block);
          if (bytes.length) {
            sectionChildren.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: bytes,
                    transformation: { width: 300, height: 200 },
                  }),
                ],
              })
            );
          }
        }
        break;

      case "video":
        sectionChildren.push(
          new Paragraph({
            text: `[Video: ${block.content?.name || "Video file"}]`,
            italics: true,
          })
        );
        break;

      case "table": {
        const { head, body } = block.tableContent || {};
        if (head && body) {
          const rows = [];

          // Table header
          rows.push(
            new TableRow({
              children: head.map(
                (h) =>
                  new TableCell({ children: [new Paragraph(h.content || "")] })
              ),
            })
          );

          // Table body
          const numCols = head.length;
          for (let i = 0; i < body.length; i += numCols) {
            const rowCells = body.slice(i, i + numCols).map(
              (cell) =>
                new TableCell({
                  children: [new Paragraph(cell.content || "")],
                })
            );
            rows.push(new TableRow({ children: rowCells }));
          }

          sectionChildren.push(new Table({ rows }));
        }
        break;
      }

      default:
        if (block.content) sectionChildren.push(new Paragraph(block.content));
        break;
    }

    // Add spacing after each block
    sectionChildren.push(new Paragraph({ text: "" }));
  }

  // Create the document with the prepared children array
  const doc = new Document({
    creator: "Draftify PRO",
    title: "Draftify Export",
    sections: [
      {
        children: sectionChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} [${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}]`;
  saveAs(blob, `draftify-pro-${timestamp}.docx`);
}

export const handleDownloadJSON = (blocksData) => {
  const dataStr = JSON.stringify(blocksData, null, 2); // Convert blocksData to pretty JSON

  // Create a timestamp for uniqueness
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} [${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}]`;

  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `draftify ${timestamp}.json`; // Unique file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

async function convertBlocksToHTML(blocksData) {
  const rowsToHTML = (block) => {
    if (!block.tableContent) return "";
    const { head, body } = block.tableContent;
    if (!head || !body) return "";

    const headerHTML = `<tr>${head
      .map((h) => `<th>${h.content || ""}</th>`)
      .join("")}</tr>`;

    const bodyHTML = [];
    const numCols = head.length;
    for (let i = 0; i < body.length; i += numCols) {
      const row = body
        .slice(i, i + numCols)
        .map((cell) => `<td>${cell.content || ""}</td>`)
        .join("");
      bodyHTML.push(`<tr>${row}</tr>`);
    }

    return `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; margin: 5px 0;">
      ${headerHTML}
      ${bodyHTML.join("")}
    </table>`;
  };

  const blocksHTML = await Promise.all(
    blocksData.map(async (block) => {
      switch (block.type) {
        case "heading":
          return `<h2>${block.content || ""}</h2>`;
        case "paragraph":
          return `<p>${block.content || ""}</p>`;
        case "quote":
          return `<blockquote>${block.content || ""}</blockquote>`;
        case "list":
          return `<ul>${(block.content || "")
            .split(",")
            .map((i) => `<li>${i.trim()}</li>`)
            .join("\n")}</ul>`;
        case "code":
          return `<pre style="background:#f3f3f3;padding:5px;border-radius:4px;">${
            block.content || ""
          }</pre>`;
        case "link":
          return `<a href="${block.content || "#"}">${block.content || ""}</a>`;
        case "image":
          return `<img src="${await imageToBase64(block)}" width="300" />`;
        case "video":
          return `<video src="${await imageToBase64(
            block
          )}" controls width="300"></video>`;
        case "table":
          return rowsToHTML(block);
        default:
          return "";
      }
    })
  );

  return blocksHTML.join("<br/>");
}

// Copy blocksData to clipboard (HTML + fallback text)
export const handleCopy = async (blocksData, setCopy) => {
  const htmlContent = await convertBlocksToHTML(blocksData);
  const textContent = blocksData.map((b) => b.content || "").join("\n\n"); // fallback plain text

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
        "text/plain": new Blob([textContent], { type: "text/plain" }),
      }),
    ]);
    setCopy(true);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

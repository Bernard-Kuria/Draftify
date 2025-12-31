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
  ExternalHyperlink,
} from "docx";

import { saveAs } from "file-saver";

import { DraftifyDocument } from "../draftify-core/schema/draftify.schema";

async function getImageBytes(imgBlock: {
  data: { src: string | Blob };
}): Promise<Uint8Array> {
  // Case 1: File or Blob object
  if (imgBlock.data.src instanceof Blob) {
    return new Uint8Array(await imgBlock.data.src.arrayBuffer());
  }

  // Case 2: Data URL (base64)
  if (
    typeof imgBlock.data.src === "string" &&
    imgBlock.data.src.startsWith("data:")
  ) {
    const base64Str = imgBlock.data.src.split(",")[1];
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
    typeof imgBlock.data.src === "string" &&
    imgBlock.data.src.startsWith("blob:")
  ) {
    const response = await fetch(imgBlock.data.src);
    const blob = await response.blob();
    return new Uint8Array(await blob.arrayBuffer());
  }

  console.warn("Cannot get bytes for image:", imgBlock);
  return new Uint8Array(0);
}

export async function exportBlocksToDocx(
  draftifyDoc: DraftifyDocument
): Promise<void> {
  // Build the children array first
  const sectionChildren = [];
  const blocksData = draftifyDoc.blocks || [];

  for (const block of blocksData) {
    switch (block.type) {
      case "heading": {
        const headingLevel = () => {
          switch (block.data.level) {
            case 1:
              return HeadingLevel.HEADING_1;
            case 2:
              return HeadingLevel.HEADING_2;
            case 3:
              return HeadingLevel.HEADING_3;
            default:
              return HeadingLevel.HEADING_1;
          }
        };
        sectionChildren.push(
          new Paragraph({
            text: block.data.text || "",
            heading: headingLevel(),
          })
        );
        break;
      }

      case "subheading":
        sectionChildren.push(
          new Paragraph({
            text: block.data.text || "",
            heading: HeadingLevel.HEADING_3,
          })
        );
        break;

      case "paragraph":
        sectionChildren.push(new Paragraph(block.data.text || ""));
        break;

      case "quote":
        sectionChildren.push(
          new Paragraph({
            text:
              block.data.text || "" + `by: ${block.data.author || "Unknown"}`,
            style: "italic",
            indent: { left: 720 },
          })
        );
        break;

      case "list": {
        const items = block.data.items || [];
        const listStyle =
          block.data.listStyle === "ordered" ? "decimal" : "bullet";

        if (listStyle === "decimal") {
          items.forEach((i: string) => {
            sectionChildren.push(
              new Paragraph({
                text: i,
                numbering: {
                  reference: "my-crazy-numbering",
                  level: 0,
                },
              })
            );
          });
        } else {
          items.forEach((i: string) => {
            sectionChildren.push(
              new Paragraph({
                text: i,
                bullet: { level: 0 },
              })
            );
          });
        }
        break;
      }

      case "code":
        sectionChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: block.data.code || "",
                font: "Courier New",
              }),
            ],
            spacing: { before: 100, after: 100 },
            shading: { fill: "f3f3f3" },
          })
        );
        break;

      case "link":
        sectionChildren.push(
          new Paragraph({
            children: [
              new ExternalHyperlink({
                link: block.data.url || "",
                children: [
                  new TextRun({
                    text: block.data.linkText || "Click here",
                    style: "Hyperlink",
                    color: "0000FF",
                    underline: {},
                  }),
                ],
              }),
            ],
          })
        );
        break;

      case "image":
        if (block.data.src) {
          const bytes = await getImageBytes(block);
          if (bytes.length) {
            sectionChildren.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: bytes,
                    transformation: { width: 300, height: 200 },
                    type: "jpg",
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
            text: `[Video: ${block.data.src || "Video file"}]`,
            style: "italic",
          })
        );
        break;

      case "table": {
        const { head, body } = block.data || {};
        if (head && body) {
          const rows = [];

          // Table header
          rows.push(
            new TableRow({
              children: head.map(
                (h: { content: string }) =>
                  new TableCell({ children: [new Paragraph(h.content || "")] })
              ),
            })
          );

          // Table body
          const numCols = head.length;
          for (let i = 0; i < body.length; i += numCols) {
            const rowCells = body.slice(i, i + numCols).map(
              (cell: { content: string }) =>
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
        break;
    }

    // Add spacing after each block
    sectionChildren.push(new Paragraph({ text: "" }));
  }

  // Create the document
  const doc = new Document({
    creator: draftifyDoc.metadata?.author || "Unknown Author",
    title: draftifyDoc.metadata?.docTitle || "Untitled",
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
  }-${now.getDate()}`;
  saveAs(
    blob,
    `${draftifyDoc.metadata?.docTitle || `Untitled`}-${timestamp}.docx`
  );
}

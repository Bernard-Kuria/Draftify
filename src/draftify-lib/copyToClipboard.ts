import {
  DraftifyBlock,
  ImageBlock,
  TableBlock,
  VideoBlock,
} from "../draftify-core/schema/draftify.schema";

export async function imageToBase64(
  imgBlock: ImageBlock | VideoBlock
): Promise<string> {
  if (!imgBlock || !imgBlock.data || !imgBlock.data.src) return "";

  const src = imgBlock.data.src;

  // Case 1: If src is already a Base64 string
  if (typeof src === "string" && src.startsWith("data:")) {
    return src;
  }

  // Case 2: If src is a Blob URL (e.g., blob:http://...)
  if (typeof src === "string" && src.startsWith("blob:")) {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to fetch and convert Blob URL to Base64:", error);
      return "";
    }
  }

  console.warn("Unsupported image source format:", src);
  return "";
}

export async function convertBlocksToHTML(
  blocksData: DraftifyBlock[]
): Promise<string> {
  const rowsToHTML = (block: TableBlock): string => {
    if (block.type !== "table") return "";
    const { head, body } = block.data;
    if (!head || !body) return "";

    const headerHTML = `<tr>${head
      .map((h: { content: string }) => `<th>${h.content || ""}</th>`)
      .join("")}</tr>`;

    const bodyHTML = [];
    const numCols = head.length;
    for (let i = 0; i < body.length; i += numCols) {
      const row = body
        .slice(i, i + numCols)
        .map((cell: { content: string }) => `<td>${cell.content || ""}</td>`)
        .join("");
      bodyHTML.push(`<tr>${row}</tr>`);
    }

    return `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; margin: 5px 0;">
      ${headerHTML}
      ${bodyHTML.join("")}
    </table>`;
  };

  const blocksHTML = await Promise.all(
    blocksData.map(async (block: DraftifyBlock) => {
      switch (block.type) {
        case "heading":
          return `<h2>${block.data.text || ""}</h2>`;
        case "subheading":
          return `<h3>${block.data.text || ""}</h3>`;
        case "paragraph":
          return `<p>${block.data.text || ""}</p>`;
        case "quote":
          return `<blockquote>${block.data.text || ""}</blockquote>`;
        case "list":
          return `<ul>${(block.data.items || [])
            .map((i: string) => `<li>${i.trim()}</li>`)
            .join("\n")}</ul>`;
        case "code":
          return `<pre style="background:#f3f3f3;padding:5px;border-radius:4px;">${
            block.data.code || ""
          }</pre>`;
        case "link":
          return `<a href="${block.data.url || "#"}" target="_blank">${
            block.data.linkText || "Click here"
          }</a>`;
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
export const handleCopy = async (
  blocksData: DraftifyBlock[],
  setCopy: (value: boolean) => void
): Promise<void> => {
  const htmlContent = await convertBlocksToHTML(blocksData);
  const textContent = blocksData
    .map((b: DraftifyBlock) => {
      if (b.type === "table") return "";
      if (b.type === "code") return b.data?.code || "";
      if (b.type === "list") return (b.data?.items || []).join(", ");
      if (b.type === "link") return b.data?.linkText || "";
      if (b.type === "image" || b.type === "video") return "";
      if (
        b.type === "heading" ||
        b.type === "subheading" ||
        b.type === "paragraph" ||
        b.type === "quote"
      )
        return b.data?.text || "";
      return "";
    })
    .join("\n\n"); // fallback plain text

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

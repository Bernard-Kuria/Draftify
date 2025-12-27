/* ======================================================
   Draftify Pro — block Modifiers
   Version: 1.0.0
   Purpose: Block modification utilities
   ====================================================== */

import {
  DraftifyBlock,
  ListBlock,
  TableBlock,
  VideoBlock,
} from "./draftify.schema";

/* ---------- Heading Modifier ---------- */
export function modifyHeadingBlock(
  blocks: DraftifyBlock[],
  headingId: string,
  newContent: string,
  level: 1 | 2 | 3
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === headingId && block.type === "heading"
      ? {
          ...block,
          data: { text: newContent, level },
        }
      : block
  );
}

/* ---------- Sub Heading Modifier ---------- */
export function modifySubheadingBlock(
  blocks: DraftifyBlock[],
  subHeadingId: string,
  newContent: string
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === subHeadingId && block.type === "subheading"
      ? {
          ...block,
          data: { text: newContent },
        }
      : block
  );
}

/* ---------- Paragraph Modifier ---------- */
export function modifyParagraphBlock(
  blocks: DraftifyBlock[],
  paragraphId: string,
  newContent: string
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === paragraphId && block.type === "paragraph"
      ? {
          ...block,
          data: { text: newContent },
        }
      : block
  );
}

/* ---------- Quote Modifier ---------- */
export function modifyQuoteBlock(
  blocks: DraftifyBlock[],
  quoteId: string,
  newContent: string,
  author: string
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === quoteId && block.type === "quote"
      ? {
          ...block,
          data: { text: newContent, author: author },
        }
      : block
  );
}

/* ---------- List Modifier ---------- */
export function modifyListBlock(
  blocks: DraftifyBlock[],
  listId: string,
  listStyle: ListBlock["data"]["listStyle"],
  items: string[]
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === listId && block.type === "list"
      ? {
          ...block,
          data: { listStyle: listStyle, items: items },
        }
      : block
  );
}

/* ---------- Table Modifier ---------- */
export function modifyTableBlock(
  blocks: DraftifyBlock[],
  tableId: string,
  tableContent: TableBlock["data"]
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === tableId && block.type === "table"
      ? {
          ...block,
          data: tableContent,
        }
      : block
  );
}

/* ---------- Image Modifier ---------- */
export function modifyImageBlock(
  blocks: DraftifyBlock[],
  imageId: string,
  src: string,
  alt: string,
  caption: string
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === imageId && block.type === "image"
      ? {
          ...block,
          data: { src: src, alt: alt, caption: caption },
        }
      : block
  );
}

/* ---------- Video Modifier ---------- */
export function modifyVideoBlock(
  blocks: DraftifyBlock[],
  videoId: string,
  src: string,
  provider: VideoBlock["data"]["provider"]
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === videoId && block.type === "video"
      ? {
          ...block,
          data: { src: src, provider: provider },
        }
      : block
  );
}

/* ---------- Link Modifier ---------- */
export function modifyLinkBlock(
  blocks: DraftifyBlock[],
  linkId: string,
  linkText: string,
  url: string
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === linkId && block.type === "link"
      ? {
          ...block,
          data: { linkText: linkText, url: url },
        }
      : block
  );
}

/* ---------- Code Modifier ---------- */
export function modifyCodeBlock(
  blocks: DraftifyBlock[],
  codeId: string,
  language: string,
  code: string
): DraftifyBlock[] {
  return blocks.map((block) =>
    block.id === codeId && block.type === "code"
      ? {
          ...block,
          data: { language: language, code: code },
        }
      : block
  );
}

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
} from "../schema/draftify.schema";

import { normalizeBlock } from "../normalizers/normalizeBlock";

/* ---------- Heading Modifier ---------- */

export function modifyHeadingBlock(
  blocks: DraftifyBlock[],
  headingId: string,
  newContent: string,
  level: 1 | 2 | 3
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === headingId && block.type === "heading") {
      const updatedBlock = { ...block, data: { text: newContent, level } };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Sub Heading Modifier ---------- */
export function modifySubheadingBlock(
  blocks: DraftifyBlock[],
  subHeadingId: string,
  newContent: string
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === subHeadingId && block.type === "subheading") {
      const updatedBlock = { ...block, data: { text: newContent } };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Paragraph Modifier ---------- */
export function modifyParagraphBlock(
  blocks: DraftifyBlock[],
  paragraphId: string,
  newContent: string
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === paragraphId && block.type === "paragraph") {
      const updatedBlock = { ...block, data: { text: newContent } };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Quote Modifier ---------- */
export function modifyQuoteBlock(
  blocks: DraftifyBlock[],
  quoteId: string,
  newContent: string,
  author: string
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === quoteId && block.type === "quote") {
      const updatedBlock = {
        ...block,
        data: { text: newContent, author: author },
      };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- List Modifier ---------- */
export function modifyListBlock(
  blocks: DraftifyBlock[],
  listId: string,
  listStyle: ListBlock["data"]["listStyle"],
  items: string[]
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === listId && block.type === "list") {
      const updatedBlock = {
        ...block,
        data: { listStyle: listStyle, items: items },
      };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Table Modifier ---------- */
export function modifyTableBlock(
  blocks: DraftifyBlock[],
  tableId: string,
  tableContent: TableBlock["data"]
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === tableId && block.type === "table") {
      const updatedBlock = { ...block, data: tableContent };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Image Modifier ---------- */
export function modifyImageBlock(
  blocks: DraftifyBlock[],
  imageId: string,
  src: string,
  alt: string,
  caption: string
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === imageId && block.type === "image") {
      const updatedBlock = {
        ...block,
        data: { src: src, alt: alt, caption: caption },
      };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Video Modifier ---------- */
export function modifyVideoBlock(
  blocks: DraftifyBlock[],
  videoId: string,
  src: string,
  provider: VideoBlock["data"]["provider"]
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === videoId && block.type === "video") {
      const updatedBlock = { ...block, data: { src: src, provider: provider } };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Link Modifier ---------- */
export function modifyLinkBlock(
  blocks: DraftifyBlock[],
  linkId: string,
  linkText: string,
  url: string
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === linkId && block.type === "link") {
      const updatedBlock = { ...block, data: { linkText: linkText, url: url } };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

/* ---------- Code Modifier ---------- */
export function modifyCodeBlock(
  blocks: DraftifyBlock[],
  codeId: string,
  language: string,
  code: string
): DraftifyBlock[] {
  return blocks.map((block) => {
    if (block.id === codeId && block.type === "code") {
      const updatedBlock = {
        ...block,
        data: { language: language, code: code },
      };
      return normalizeBlock(updatedBlock);
    }
    return block;
  });
}

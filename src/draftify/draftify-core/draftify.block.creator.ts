/* ======================================================
   Draftify Pro — Block Creator
   Version: 1.0.0
   Purpose: Block creation utilities
   ====================================================== */

import {
  CodeBlock,
  HeadingBlock,
  SubheadingBlock,
  ImageBlock,
  LinkBlock,
  ListBlock,
  ParagraphBlock,
  QuoteBlock,
  TableBlock,
  VideoBlock,
} from "./draftify.schema";

/* ---------- Heading Block ---------- */

export function createHeadingBlock(level: 1 | 2 | 3 = 1): HeadingBlock {
  return {
    id: crypto.randomUUID(),
    type: "heading",
    createdAt: new Date().toISOString(),
    data: {
      text: "",
      level: level,
    },
  };
}

/* ---------- Subheading BLock ---------- */

export function createSubheadingBlock(): SubheadingBlock {
  return {
    id: crypto.randomUUID(),
    type: "subheading",
    createdAt: new Date().toISOString(),
    data: {
      text: "",
    },
  };
}

/* ---------- Paragraph Block ---------- */

export function createParagraphBlock(): ParagraphBlock {
  return {
    id: crypto.randomUUID(),
    type: "paragraph",
    createdAt: new Date().toISOString(),
    data: {
      text: "",
    },
  };
}

/* ---------- Quote Block ---------- */

export function createQuoteBlock(): QuoteBlock {
  return {
    id: crypto.randomUUID(),
    type: "quote",
    createdAt: new Date().toISOString(),
    data: {
      text: "",
      author: "",
    },
  };
}

/* ---------- List Block ---------- */

export function createListBlock(
  listStyle: ListBlock["data"]["listStyle"] = "unordered"
): ListBlock {
  return {
    id: crypto.randomUUID(),
    type: "list",
    createdAt: new Date().toISOString(),
    data: {
      listStyle: listStyle ?? "unordered",
      items: [],
    },
  };
}

/* ---------- Table Block ---------- */

export function createTableBlock(cells: {
  rows: number;
  cols: number;
}): TableBlock {
  const rows = cells?.rows || 2;
  const cols = cells?.cols || 2;

  return {
    id: crypto.randomUUID(),
    type: "table",
    createdAt: new Date().toISOString(),
    data: {
      head: Array.from({ length: cols }, (_, col) => ({
        id: col,
        content: "",
      })),
      body: Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
          id: [row, col],
          content: "",
        }))
      ).flat(),
    },
  };
}

/* ---------- Image Block ---------- */

export function createImageBlock(): ImageBlock {
  return {
    id: crypto.randomUUID(),
    type: "image",
    createdAt: new Date().toISOString(),
    data: {
      src: "",
      alt: "",
      caption: "",
    },
  };
}

/* ---------- Video BLock ---------- */

export function createVideoBlock(
  provider: "youtube" | "vimeo" | "custom" | undefined
): VideoBlock {
  return {
    id: crypto.randomUUID(),
    type: "video",
    createdAt: new Date().toISOString(),
    data: {
      src: "",
      provider: provider,
    },
  };
}

/* ---------- Link Block ---------- */

export function createLinkBlock(): LinkBlock {
  return {
    id: crypto.randomUUID(),
    type: "link",
    createdAt: new Date().toISOString(),
    data: {
      linkText: "",
      url: "",
    },
  };
}

/* ---------- Code Block ---------- */

export function createCodeBlock(): CodeBlock {
  return {
    id: crypto.randomUUID(),
    type: "code",
    createdAt: new Date().toISOString(),
    data: {
      language: "",
      code: "",
    },
  };
}

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
} from "../schema/draftify.schema";

import { DraftifyBlock } from "../schema/draftify.schema";

function createBlock<T extends DraftifyBlock>(
  type: T["type"],
  data: T["data"]
): T {
  return {
    id: crypto.randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    data,
  } as T;
}

export function createHeadingBlock(level: HeadingBlock["data"]["level"] = 1): HeadingBlock {
  return createBlock<HeadingBlock>("heading", { text: "", level});
}

export function createSubheadingBlock(): SubheadingBlock {
  return createBlock<SubheadingBlock>("subheading", { text: "" });
}

export function createParagraphBlock(): ParagraphBlock {
  return createBlock<ParagraphBlock>("paragraph", { text: "" });
}

export function createQuoteBlock(): QuoteBlock {
  return createBlock<QuoteBlock>("quote", { text: "", author: "" });
}

export function createListBlock(
  listStyle: ListBlock["data"]["listStyle"] = "unordered"
): ListBlock {
  return createBlock<ListBlock>("list", {
    listStyle: listStyle ?? "unordered",
    items: [],
  });
}

export function createTableBlock(cells: {
  rows: number;
  cols: number;
}): TableBlock {
  const rows = cells?.rows || 2;
  const cols = cells?.cols || 2;
  return createBlock<TableBlock>("table", {
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
  });
}

export function createImageBlock(): ImageBlock {
  return createBlock<ImageBlock>("image", {
    src: "",
    alt: "",
    caption: "",
  });
}

export function createVideoBlock(
  provider: "youtube" | "vimeo" | "custom" | undefined
): VideoBlock {
  return createBlock<VideoBlock>("video", { src: "", provider });
}

export function createLinkBlock(): LinkBlock {
  return createBlock<LinkBlock>("link", { linkText: "", url: "" });
}

export function createCodeBlock(): CodeBlock {
  return createBlock<CodeBlock>("code", { language: "", code: "" });
}

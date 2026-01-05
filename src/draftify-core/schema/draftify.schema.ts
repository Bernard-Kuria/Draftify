/* ======================================================
   Draftify Pro — Core Content Schema
   Version: 1.0.0
   Purpose: UI-agnostic block-based editor schema
   ====================================================== */

/* ---------- Meta ---------- */

export type DraftifyVersion = string;

export interface DraftifyDocument {
  version: DraftifyVersion;
  metadata?: DraftifyMetadata;
  blocks: DraftifyBlock[];
}

/* ---------- Metadata ---------- */

export interface DraftifyMetadata {
  docTitle?: string;
  description?: string;
  author?: string;
  createdAt?: string;
}

/* ---------- Block Base ---------- */

export interface DraftifyBlockBase {
  id: string; // UUID or nanoid
  createdAt?: string;
  type: DraftifyBlockType;
}

/* ---------- Block Types ---------- */

export type DraftifyBlockType =
  | "heading"
  | "subheading"
  | "paragraph"
  | "list"
  | "quote"
  | "code"
  | "link"
  | "image"
  | "video"
  | "table"
  | "custom-1"
  | "custom-2"
  | "custom-3";

/* ---------- Individual Blocks ---------- */

export interface HeadingBlock extends DraftifyBlockBase {
  type: "heading";
  data: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export interface SubheadingBlock extends DraftifyBlockBase {
  type: "subheading";
  data: {
    text: string;
  };
}

export interface ParagraphBlock extends DraftifyBlockBase {
  type: "paragraph";
  data: {
    text: string;
  };
}

export interface ListBlock extends DraftifyBlockBase {
  type: "list";
  data: {
    listStyle: "ordered" | "unordered";
    items: string[];
  };
}

export interface QuoteBlock extends DraftifyBlockBase {
  type: "quote";
  data: {
    text: string;
    author?: string;
  };
}

export interface CodeBlock extends DraftifyBlockBase {
  type: "code";
  data: {
    language?: string;
    code: string;
  };
}

export interface LinkBlock extends DraftifyBlockBase {
  type: "link";
  data: {
    linkText: string;
    url: string;
  };
}

export interface ImageBlock extends DraftifyBlockBase {
  type: "image";
  data: {
    src: string;
    alt?: string;
    caption?: string;
  };
}

export interface VideoBlock extends DraftifyBlockBase {
  type: "video";
  data: {
    src: string;
    provider?: "youtube" | "vimeo" | "custom";
  };
}

export interface TableBlock extends DraftifyBlockBase {
  type: "table";
  data: {
    head: {
      id: number;
      content: string;
    }[];
    body: {
      id: number[];
      content: string;
    }[];
  };
}

export interface CustomBlock extends DraftifyBlockBase {
  type: "custom-1" | "custom-2" | "custom-3";
  data: any;
}

/* ---------- Union ---------- */

export type DraftifyBlock =
  | HeadingBlock
  | SubheadingBlock
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | LinkBlock
  | ImageBlock
  | VideoBlock
  | TableBlock
  | CustomBlock;

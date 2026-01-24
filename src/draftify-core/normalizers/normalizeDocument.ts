import { DraftifyBlock } from "../schema/draftify.schema";
import { normalizeBlock } from "./normalizeBlock";

export interface DraftifyDocument {
  blocks: DraftifyBlock[];
  [key: string]: any;
}

export function normalizeDocument(doc: DraftifyDocument): DraftifyDocument {
  if (!doc || typeof doc !== "object") {
    return { blocks: [] };
  }

  const normalizedBlocks = Array.isArray(doc.blocks)
    ? doc.blocks.map(normalizeBlock)
    : [];

  return {
    ...doc,
    version: doc.version || "1.0.0",
    metadata: {
      docTitle: doc.metadata?.docTitle || "Untitled Document",
      description: doc.metadata?.description || "",
      author: doc.metadata?.author || "Unknown Author",
      createdAt: doc.metadata?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    blocks: normalizedBlocks,
  };
}

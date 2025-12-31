// schema
export * from "./draftify-core/schema/draftify.schema";

// Creators
export * from "./draftify-core/creators/draftify.block.creator";

// Modifiers
export * from "./draftify-core/modifiers/draftify.block.modifier";

// Validators
export { validateBlock } from "./draftify-core/validators/validateBlock";
export { validateDocument } from "./draftify-core/validators/validateDocument";
export * from "./draftify-core/validators/types";

// Normalizers
export { normalizeBlock } from "./draftify-core/normalizers/normalizeBlock";
export { normalizeDocument } from "./draftify-core/normalizers/normalizeDocument";

// Registry (optional for advanced users)
export { blockRegistry } from "./draftify-core/registry/blockRegistry";

// Utilities
export {
  imageToBase64,
  convertBlocksToHTML,
  handleCopy,
} from "./draftify-lib/copyToClipboard";

export { handleDownloadJSON } from "./draftify-lib/downloadJSON";

export { exportBlocksToDocx } from "./draftify-lib/exportToDocx";

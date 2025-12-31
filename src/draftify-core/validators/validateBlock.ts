import {
  DraftifyBlock,
  HeadingBlock,
  SubheadingBlock,
  ParagraphBlock,
  QuoteBlock,
  ListBlock,
  TableBlock,
  ImageBlock,
  VideoBlock,
  LinkBlock,
  CodeBlock,
} from "../schema/draftify.schema";

import { blockRegistry } from "../registry/blockRegistry";
import { ValidationResult } from "./types";

export function validateBlock(block: DraftifyBlock): ValidationResult {
  switch (block.type) {
    case "heading":
      return blockRegistry.heading.validator(block as HeadingBlock);
    case "subheading":
      return blockRegistry.subheading.validator(block as SubheadingBlock);
    case "paragraph":
      return blockRegistry.paragraph.validator(block as ParagraphBlock);
    case "quote":
      return blockRegistry.quote.validator(block as QuoteBlock);
    case "list":
      return blockRegistry.list.validator(block as ListBlock);
    case "table":
      return blockRegistry.table.validator(block as TableBlock);
    case "image":
      return blockRegistry.image.validator(block as ImageBlock);
    case "video":
      return blockRegistry.video.validator(block as VideoBlock);
    case "link":
      return blockRegistry.link.validator(block as LinkBlock);
    case "code":
      return blockRegistry.code.validator(block as CodeBlock);
    default:
      return block;
  }
}

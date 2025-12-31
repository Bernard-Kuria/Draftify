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

export function normalizeBlock(block: DraftifyBlock): DraftifyBlock {
  switch (block.type) {
    case "heading":
      return blockRegistry.heading.normalizer(block as HeadingBlock);
    case "subheading":
      return blockRegistry.subheading.normalizer(block as SubheadingBlock);
    case "paragraph":
      return blockRegistry.paragraph.normalizer(block as ParagraphBlock);
    case "quote":
      return blockRegistry.quote.normalizer(block as QuoteBlock);
    case "list":
      return blockRegistry.list.normalizer(block as ListBlock);
    case "table":
      return blockRegistry.table.normalizer(block as TableBlock);
    case "image":
      return blockRegistry.image.normalizer(block as ImageBlock);
    case "video":
      return blockRegistry.video.normalizer(block as VideoBlock);
    case "link":
      return blockRegistry.link.normalizer(block as LinkBlock);
    case "code":
      return blockRegistry.code.normalizer(block as CodeBlock);
    default:
      return block;
  }
}

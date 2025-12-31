import { validateHeadingBlock } from "../validators/blockValidators/heading.validator";
import { validateSubheadingBlock } from "../validators/blockValidators/subheading.validator";
import { validateParagraphBlock } from "../validators/blockValidators/paragraph.validator";
import { validateQuoteBlock } from "../validators/blockValidators/quote.validator";
import { validateListBlock } from "../validators/blockValidators/list.validator";
import { validateTableBlock } from "../validators/blockValidators/table.validator";
import { validateImageBlock } from "../validators/blockValidators/image.validator";
import { validateVideoBlock } from "../validators/blockValidators/video.validator";
import { validateLinkBlock } from "../validators/blockValidators/link.validator";
import { validateCodeBlock } from "../validators/blockValidators/code.validator";

import { normalizeHeadingBlock } from "../normalizers/blockNormalizers/heading.normalizer";
import { normalizeSubheadingBlock } from "../normalizers/blockNormalizers/subheading.normalizer";
import { normalizeParagraphBlock } from "../normalizers/blockNormalizers/paragraph.normalizer";
import { normalizeQuoteBlock } from "../normalizers/blockNormalizers/quote.normalizer";
import { normalizeTableBlock } from "../normalizers/blockNormalizers/table.normalizer";
import { normalizeListBlock } from "../normalizers/blockNormalizers/list.normalizer";
import { normalizeImageBlock } from "../normalizers/blockNormalizers/image.normalizer";
import { normalizeVideoBlock } from "../normalizers/blockNormalizers/video.normalizer";
import { normalizeLinkBlock } from "../normalizers/blockNormalizers/link.normalizer";
import { normalizeCodeBlock } from "../normalizers/blockNormalizers/code.normalizer";
import { ValidationResult } from "../validators/types";

import {
  DraftifyBlock,
  DraftifyBlockType,
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

export type BlockTypeMap = {
  heading: HeadingBlock;
  subheading: SubheadingBlock;
  paragraph: ParagraphBlock;
  quote: QuoteBlock;
  list: ListBlock;
  table: TableBlock;
  image: ImageBlock;
  video: VideoBlock;
  link: LinkBlock;
  code: CodeBlock;
};

export type BlockValidator = (block: DraftifyBlock) => ValidationResult;
export type BlockNormalizer = (block: DraftifyBlock) => DraftifyBlock;

export interface BlockRegistryEntry<T extends DraftifyBlock> {
  validator: (block: DraftifyBlock) => ValidationResult;
  normalizer: (block: T) => T;
}

export const blockRegistry: {
  [K in DraftifyBlockType]: BlockRegistryEntry<BlockTypeMap[K]>;
} = {
  heading: {
    validator: validateHeadingBlock,
    normalizer: normalizeHeadingBlock,
  },
  subheading: {
    validator: validateSubheadingBlock,
    normalizer: normalizeSubheadingBlock,
  },
  paragraph: {
    validator: validateParagraphBlock,
    normalizer: normalizeParagraphBlock,
  },
  quote: {
    validator: validateQuoteBlock,
    normalizer: normalizeQuoteBlock,
  },
  list: {
    validator: validateListBlock,
    normalizer: normalizeListBlock,
  },
  table: {
    validator: validateTableBlock,
    normalizer: normalizeTableBlock,
  },
  image: {
    validator: validateImageBlock,
    normalizer: normalizeImageBlock,
  },
  video: {
    validator: validateVideoBlock,
    normalizer: normalizeVideoBlock,
  },
  link: {
    validator: validateLinkBlock,
    normalizer: normalizeLinkBlock,
  },
  code: {
    validator: validateCodeBlock,
    normalizer: normalizeCodeBlock,
  },
};

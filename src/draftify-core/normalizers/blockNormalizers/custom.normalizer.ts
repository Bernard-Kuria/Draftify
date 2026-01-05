import { CustomBlock } from "../../schema/draftify.schema";

export function normalizeCustomBlock(block: CustomBlock): CustomBlock {
  return {
    ...block,
  };
}

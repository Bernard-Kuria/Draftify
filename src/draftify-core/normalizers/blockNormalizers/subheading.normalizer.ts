import { SubheadingBlock } from "../../schema/draftify.schema";

export function normalizeSubheadingBlock(
  block: SubheadingBlock
): SubheadingBlock {
  return {
    ...block,
    type: "subheading",
    data: {
      text: typeof block.data?.text === "string" ? block.data.text : "",
    },
  };
}

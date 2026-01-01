import { HeadingBlock } from "../../schema/draftify.schema";

export function normalizeHeadingBlock(block: HeadingBlock): HeadingBlock {
  return {
    ...block,
    type: "heading",
    data: {
      text: typeof block.data?.text === "string" ? block.data.text : "",
      level:
        typeof block.data?.level === "number" &&
        block.data.level >= 1 &&
        block.data.level <= 6
          ? block.data.level
          : 1,
    },
  };
}

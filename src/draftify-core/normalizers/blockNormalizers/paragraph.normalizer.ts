import { ParagraphBlock } from "../../schema/draftify.schema";

export function normalizeParagraphBlock(block: ParagraphBlock): ParagraphBlock {
  return {
    ...block,
    type: "paragraph",
    data: {
      text: typeof block.data?.text === "string" ? block.data.text.trim() : "",
    },
  };
}

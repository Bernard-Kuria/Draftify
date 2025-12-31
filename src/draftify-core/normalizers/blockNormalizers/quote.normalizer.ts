import { QuoteBlock } from "../../schema/draftify.schema";

export function normalizeQuoteBlock(block: QuoteBlock): QuoteBlock {
  return {
    ...block,
    type: "quote",
    data: {
      text: typeof block.data?.text === "string" ? block.data.text.trim() : "",
      author:
        typeof block.data?.author === "string"
          ? block.data.author.trim()
          : undefined,
    },
  };
}

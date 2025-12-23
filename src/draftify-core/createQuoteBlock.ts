import { QuoteBlock } from "../schema/draftify.schema";

export function createQuoteBlock(
  text: string,
  author: string | undefined
): QuoteBlock {
  return {
    id: crypto.randomUUID(),
    type: "quote",
    createdAt: new Date().toISOString(),
    data: {
      text,
      author: author,
    },
  };
}

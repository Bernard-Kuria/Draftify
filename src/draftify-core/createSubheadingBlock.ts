import { SubheadingBlock } from "../schema/draftify.schema";

export function createSubheadingBlock(text: string): SubheadingBlock {
  return {
    id: crypto.randomUUID(),
    type: "subheading",
    createdAt: new Date().toISOString(),
    data: {
      text,
    },
  };
}

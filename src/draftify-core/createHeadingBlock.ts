import { HeadingBlock } from "../schema/draftify.schema";

export function createHeadingBlock(text: string, level = 1): HeadingBlock {
  return {
    id: crypto.randomUUID(),
    type: "heading",
    createdAt: new Date().toISOString(),
    data: {
      text,
      level: level,
    },
  };
}

import { ParagraphBlock } from "../schema/draftify.schema";

export function createParagraphBlock(): ParagraphBlock {
  return {
    id: crypto.randomUUID(),
    type: "paragraph",
    createdAt: new Date().toISOString(),
    data: {
      text: "",
    },
  };
}

import { LinkBlock } from "../schema/draftify.schema";

export function createLinkBlock(text: string, url: string): LinkBlock {
  return {
    id: crypto.randomUUID(),
    type: "link",
    createdAt: new Date().toISOString(),
    data: {
      text: text,
      url: url,
    },
  };
}

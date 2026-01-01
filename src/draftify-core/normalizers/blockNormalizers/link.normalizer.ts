import { LinkBlock } from "../../schema/draftify.schema";

export function normalizeLinkBlock(block: LinkBlock): LinkBlock {
  return {
    ...block,
    type: "link",
    data: {
      linkText:
        typeof block.data?.linkText === "string"
          ? block.data.linkText
          : "",
      url: typeof block.data?.url === "string" ? block.data.url : "",
    },
  };
}

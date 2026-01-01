import { ListBlock } from "../../schema/draftify.schema";

export function normalizeListBlock(block: ListBlock): ListBlock {
  return {
    ...block,
    type: "list",
    data: {
      listStyle: block.data?.listStyle === "ordered" ? "ordered" : "unordered",
      items: Array.isArray(block.data?.items)
        ? block.data.items
            .filter((item): item is string => typeof item === "string")
            .map((item) => item)
        : [],
    },
  };
}

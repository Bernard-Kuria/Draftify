import { ListBlock } from "../schema/draftify.schema";

export function createListBlock(
  items: string[],
  style?: "ordered" | "unordered"
): ListBlock {
  return {
    id: crypto.randomUUID(),
    type: "list",
    createdAt: new Date().toISOString(),
    data: {
      style: style ?? "unordered",
      items: items,
    },
  };
}

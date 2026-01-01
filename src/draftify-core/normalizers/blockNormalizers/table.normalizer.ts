import { TableBlock } from "../../schema/draftify.schema";

export function normalizeTableBlock(block: TableBlock): TableBlock {
  return {
    ...block,
    type: "table",
    data: {
      head: Array.isArray(block.data?.head)
        ? block.data.head.map((cell, index) => ({
            id: typeof cell.id === "number" ? cell.id : index,
            content:
              typeof cell.content === "string" ? cell.content : "",
          }))
        : [],
      body: Array.isArray(block.data?.body)
        ? block.data.body.map((cell, index) => ({
            id: Array.isArray(cell.id) ? cell.id : [index],
            content:
              typeof cell.content === "string" ? cell.content : "",
          }))
        : [],
    },
  };
}

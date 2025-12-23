import { TableBlock } from "../schema/draftify.schema";

export function createTableBlock(cells: {
  rows: number;
  cols: number;
}): TableBlock {
  const rows = cells?.rows || 2;
  const cols = cells?.cols || 2;

  return {
    id: crypto.randomUUID(),
    type: "table",
    createdAt: new Date().toISOString(),
    data: {
      head: Array.from({ length: cols }, (_, col) => ({
        id: col,
        content: "",
      })),
      body: Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
          id: [row, col],
          content: "",
        }))
      ).flat(),
    },
  };
}

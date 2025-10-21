import { useState } from "react";

export function useDraftify(initialBlocks = []) {
  const [blocksData, setBlocksData] = useState(initialBlocks);

  const handleClick = (block, cells) => {
    let newTableContent;

    if (block.type === "table") {
      const rows = cells?.rows || 2;
      const cols = cells?.cols || 2;

      newTableContent = {
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
      };
    }

    setBlocksData((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: block.type,
        content: "",
        tableContent: newTableContent || null,
        cells:
          block.type === "table" ? cells || { rows: 2, cols: 2 } : undefined,
      },
    ]);
  };
  const handleChange = (id, newContent) => {
    setBlocksData((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: newContent } : b))
    );
  };
  const handleTableChange = (id, newTable) => {
    setBlocksData((prev) =>
      prev.map((b) => (b.id === id ? { ...b, tableContent: newTable } : b))
    );
  };

  return { blocksData, handleClick, handleChange, handleTableChange };
}

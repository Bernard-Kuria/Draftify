import { useEffect, useState } from "react";
import EditBlock from "./components/EditBlock";
import Options from "./components/Options";
import OutputBlock from "./components/OutputBlock";

export default function Draftify() {
  const [blocksData, setBlocksData] = useState([
    { id: 1, type: "heading", content: "" },
  ]);

  const [tableContent, setTableContent] = useState({
    head: [{ id: 2, content: "" }],
    body: [{ id: [2, 2], content: "" }],
  });

  function handleClick(block, cells) {
    if (cells) {
      const newTableContent = {
        head: Array.from({ length: cells.cols + 1 }, (_, col) => ({
          id: col,
          content: "",
        })),
        body: Array.from({ length: cells.rows + 1 }, (_, row) =>
          Array.from({ length: cells.cols + 1 }, (_, col) => ({
            id: [row, col],
            content: "",
          }))
        ).flat(),
      };

      setTableContent(newTableContent);
    }

    setBlocksData((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: block.type,
        content: "",
        tableContent: tableContent,
        cells:
          block.type === "table" ? cells || { rows: 2, cols: 2 } : undefined,
      },
    ]);
  }

  useEffect(() => {
    setBlocksData((prev) =>
      prev.map((b) =>
        b.type === "table" ? { ...b, tableContent: tableContent } : b
      )
    );
  }, [tableContent]);

  function handleChange(id, newContent) {
    setBlocksData((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: newContent } : b))
    );
  }

  return (
    <div className="flex flex-col gap-[10px] w-[80%] min-h-[80%] h-fit border border-gray-600 rounded-2xl p-5">
      <Options handleClick={handleClick} />
      <form
        className="h-full min-h-[400px] border border-gray-600 rounded-2xl p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {blocksData.map((b) => (
          <EditBlock
            key={b.id}
            tableContent={tableContent}
            setTableContent={setTableContent}
            block={b}
            onChange={handleChange}
          />
        ))}
      </form>
      <OutputBlock blocksData={blocksData} />
    </div>
  );
}

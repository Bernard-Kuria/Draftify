import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { renderTable } from "../../utils/DraftifyHooks/tableHooks/tableEffects";

export default function TableEditor({ block, onTableChange }) {
  return (
    <table className="mt-4">
      <thead>
        <tr>
          {block.tableContent?.head?.map((cell, idx) => (
            <th key={idx} className="border p-2">
              <input
                type="text"
                className="outline-none w-full"
                autoFocus
                value={cell.content}
                onChange={(e) => {
                  const updatedHead = block.tableContent.head.map((h) =>
                    h.id === cell.id ? { ...h, content: e.target.value } : h
                  );
                  const updatedTable = {
                    ...block.tableContent,
                    head: updatedHead,
                  };
                  onTableChange(block.id, updatedTable);
                }}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTable(block, onTableChange)}</tbody>
    </table>
  );
}

export function TableOutput({ block }) {
  if (
    !block.tableContent ||
    !block.tableContent.head ||
    !block.tableContent.body
  ) {
    return null;
  }

  const { head, body } = block.tableContent;

  const numCols = head.length;
  const groupedBody = body.reduce((acc, cell, index) => {
    const rowIndex = Math.floor(index / numCols);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(cell);
    return acc;
  }, []);

  return (
    <table key={block.id} className="w-full">
      <thead>
        <tr>
          {head.map((cell) => (
            <th key={cell.id} className="border p-2">
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedBody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell) => (
              <td key={cell.id.join("-")} className="border p-2">
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function RenderHoverTable({ handleClick, block }) {
  const [table, setTable] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [hoveredCell, setHoveredCell] = useState({ rows: 2, cols: 2 });
  const size = 10;

  useEffect(() => {
    setHoveredCell({ rows: row, cols: col });
  }, [row, col]);

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={["fas", "angle-down"]}
        onClick={() => setTable((prev) => !prev)}
      />
      {table ? (
        <div className="absolute -translate-x-[40px] translate-y-[10px] bg-white flex flex-col gap-1 w-40 h-50 border border-gray-600 rounded-[10px] cursor-pointer p-2">
          <div className="flex w-full gap-1">
            <input
              className="w-[40px] underline text-center border rounded-[5px]"
              type="number"
              value={row}
              onChange={(e) => setRow(e.target.value)}
            />
            x
            <input
              className="w-[40px] underline text-center border rounded-[5px]"
              type="number"
              value={col}
              onChange={(e) => setCol(e.target.value)}
            />
            <button
              className="border rounded-[5px] leading-none px-1 border-(--draftify-theme-color) text-(--draftify-theme-color) cursor-pointer hover:bg-(--draftify-theme-color) hover:text-white"
              onClick={() => {
                setTable(false);
                handleClick(block, hoveredCell);
              }}
            >
              enter
            </button>
          </div>
          {[...Array(size)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {[...Array(size)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex-1 h-3 border border-gray-600 rounded-2 ${
                    rowIndex <= hoveredCell.rows && colIndex <= hoveredCell.cols
                      ? "bg-blue-400"
                      : "bg-gray-200"
                  }`}
                  onMouseEnter={() =>
                    setHoveredCell({ rows: rowIndex, cols: colIndex })
                  }
                  onMouseLeave={() => setHoveredCell({ rows: 0, cols: 0 })}
                  onClick={() => {
                    setTable(false);
                    handleClick(block, hoveredCell);
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

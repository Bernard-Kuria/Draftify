import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const blocks = [
  { id: 1, type: "heading", icon: ["fas", "heading"] },
  { id: 2, type: "paragraph", icon: ["fas", "paragraph"] },
  { id: 8, type: "quote", icon: ["fas", "quote-right"] },
  { id: 4, type: "list", icon: ["fas", "list"] },
  {
    id: 3,
    type: "table",
    cells: { row: 2, col: 2 },
    tableContent: [],
    icon: ["fas", "table-list"],
  },
  { id: 7, type: "image", icon: ["far", "image"] },
  { id: 9, type: "media", icon: ["fas", "play"] },
  { id: 5, type: "link", icon: ["fas", "link"] },
  { id: 6, type: "code", icon: ["fas", "code"] },
];

export default function Options({ handleClick }) {
  const [activeId, setActiveId] = useState(null);
  const [table, setTable] = useState(false);
  const [hoveredCell, setHoveredCell] = useState({ rows: 2, cols: 2 });
  const size = 9;

  return (
    <div className="flex gap-[10px] items-center">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`flex items-center gap-[10px] min-fit h-[40px] p-2 border-2 border-gray-600 cursor-pointer ${
            activeId === block.id ? "text-blue-500" : "text-gray-600"
          }`}
        >
          <FontAwesomeIcon
            icon={block.icon}
            onClick={() => {
              setActiveId(block.id);
              handleClick({ id: block.id, type: block.type });
            }}
          />{" "}
          {block.type === "table" ? (
            <div className="relative">
              <FontAwesomeIcon
                icon={["fas", "angle-down"]}
                onClick={() => setTable((prev) => !prev)}
              />
              {table ? (
                <div className="absolute -translate-x-[40px] translate-y-[10px] bg-white flex flex-col gap-1 w-40 h-40 border border-gray-600 rounded-[10px] cursor-pointer p-2">
                  {[...Array(size)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1">
                      {[...Array(size)].map((_, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`flex-1 h-3 border border-gray-600 rounded-2
                ${
                  rowIndex <= hoveredCell.rows && colIndex <= hoveredCell.cols
                    ? "bg-blue-400"
                    : "bg-gray-200"
                }`}
                          onMouseEnter={() =>
                            setHoveredCell({ rows: rowIndex, cols: colIndex })
                          }
                          onMouseLeave={() =>
                            setHoveredCell({ rows: -1, cols: -1 })
                          }
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
          ) : null}
        </div>
      ))}
    </div>
  );
}

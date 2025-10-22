import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RenderHoverTable } from "./blockComponents/Table";

const blocks = [
  { id: 1, type: "heading", icon: ["fas", "heading"] },
  { id: 2, type: "paragraph", icon: ["fas", "paragraph"] },
  { id: 3, type: "quote", icon: ["fas", "quote-right"] },
  { id: 4, type: "list", icon: ["fas", "list"] },
  { id: 5, type: "table", icon: ["fas", "table-list"] },
  { id: 6, type: "image", icon: ["far", "image"] },
  { id: 7, type: "media", icon: ["fas", "play"] },
  { id: 8, type: "link", icon: ["fas", "link"] },
  { id: 9, type: "code", icon: ["fas", "code"] },
];

export default function Options({ handleClick }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="flex flex-wrap gap-[5px] md:gap-[10px] items-center">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`flex items-center gap-[10px] h-[40px] p-2 border-2 border-gray-600 cursor-pointer rounded-[10px] text-sm md:text-md ${
            activeId === block.id ? "text-(--theme-color)" : "text-gray-600"
          }`}
        >
          <FontAwesomeIcon
            icon={block.icon}
            onClick={() => {
              setActiveId(block.id);
              handleClick({ id: block.id, type: block.type });
            }}
          />{" "}
          {block.type === "table" && (
            <RenderHoverTable handleClick={handleClick} block={block} />
          )}
        </div>
      ))}
    </div>
  );
}

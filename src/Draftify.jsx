import "./utils/icons";
import "./Draftify.css";

import { useState } from "react";

import EditBlock from "./DrafityComponents/EditBlock";
import Options from "./DrafityComponents/Options";
import OutputBlock from "./DrafityComponents/OutputBlock";

import { useDraftify } from "./utils/useDraftify";

import Toggle from "./DrafityComponents/Toggle";

export default function Draftify() {
  const [view, setView] = useState("editor");

  const { blocksData, handleClick, handleChange, handleTableChange } =
    useDraftify([
      {
        id: 1,
        type: "",
        tableContent: {
          head: [
            { id: 0, content: "" },
            { id: 1, content: "" },
          ],
          body: [
            { id: [0, 0], content: "" },
            { id: [0, 1], content: "" },
            { id: [1, 0], content: "" },
            { id: [1, 1], content: "" },
          ],
        },
      },
      { id: 2, type: "text", content: "Hello" },
    ]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <div className="flex flex-col gap-[10px] w-[80%] min-h-[400px] h-fit border border-gray-600 rounded-2xl p-5">
        <Toggle view={view} setView={setView} />
        <Options handleClick={handleClick} />
        {view === "editor" && (
          <div
            className="flex-1 border border-gray-600 rounded-2xl p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {blocksData.map((b) => (
              <EditBlock
                key={b.id}
                block={b}
                onChange={handleChange}
                onTableChange={handleTableChange}
              />
            ))}
          </div>
        )}
        {view === "preview" && (
          <div
            className="grid gap-[10px] border border-gray-600 rounded-2xl p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <OutputBlock blocksData={blocksData} />
          </div>
        )}
      </div>
    </div>
  );
}

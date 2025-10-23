import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { handleThemeBtnClick } from "../utils/DraftifyHooks/ToolBarHooks/ToggleEffects";
import Tooltip from "./Tooltip";

import {
  handleDownloadJSON,
  handleCopy,
  exportBlocksToDocx,
} from "../utils/DraftifyHooks/ToolBarHooks/ToolBarInteractions";

export default function ToolBar({ view, setView, blocksData }) {
  const [copy, setCopy] = useState(false);
  const themeModeBtn = useRef(null);
  const themeModeToggle = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  }, [copy]);

  return (
    <div className="md:h-[40px]">
      <div className="relative grid md:flex items-center text-[12px] italic gap-[10px]">
        <div className="md:flex gap-[10px] items-center font-bold logo-text text-[20px]">
          DRAFTIFY PRO{" "}
          <div className="underline font-normal text-[12px]">
            Write. Create. Build your story block by block.
          </div>
        </div>
        <div className="md:absolute right-0 flex items-center gap-[10px]">
          <Tooltip text="e.g. for dev dummy data">
            <button
              className="border rounded-[10px] bg-(--hovered-theme-color) text-white hover:font-semibold hover:bg-(--theme-color) p-1 cursor-pointer"
              onClick={() => handleDownloadJSON(blocksData)}
            >
              Download JSON <FontAwesomeIcon icon={["fas", "download"]} />
            </button>
          </Tooltip>
          <Tooltip text={`Download as document`}>
            <button
              className="border rounded-[10px] bg-(--hovered-theme-color) text-white hover:font-semibold hover:bg-(--theme-color) p-1 cursor-pointer"
              onClick={() => exportBlocksToDocx(blocksData)}
            >
              Export .docx <FontAwesomeIcon icon={["fas", "download"]} />
            </button>
          </Tooltip>
          <Tooltip text={`copy to clipboard`}>
            <button
              className={`p-1 cursor-pointer ${
                copy ? "text-green-400" : "text-(--hovered-theme-color)"
              }`}
            >
              <FontAwesomeIcon
                icon={["fas", `${copy ? "check" : "copy"}`]}
                onClick={() => handleCopy(blocksData, setCopy)}
              />
            </button>
          </Tooltip>
          <Tooltip text={`toggle btn editor & preview`}>
            <div
              ref={themeModeBtn}
              className="border w-[30px] h-[16px] rounded-[16px] cursor-pointer duration-300 flex items-center p-[0px]"
              onClick={() => {
                setView((prev) => (prev === "editor" ? "preview" : "editor"));
                handleThemeBtnClick(
                  view,
                  themeModeBtn.current,
                  themeModeToggle.current
                );
              }}
            >
              <div
                ref={themeModeToggle}
                className="w-[12px] h-[12px] rounded-[12px] bg-[#232323] duration-300 flex items-center leading-[0.5rem] justify-center translate-x-[1px]"
              >
                <div className="flex items-center h-full text-white -translate-y-[2px]">
                  {view === "editor" ? "e" : "p"}
                </div>
              </div>
            </div>{" "}
          </Tooltip>
          <div className="w-[100px]">viewing {view}</div>
        </div>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { handleThemeBtnClick } from "../utils/DraftifyHooks/ToolBarHooks/ToggleEffects";
import { handleDownloadJSON } from "../utils/DraftifyHooks/ToolBarHooks/ToolBarInteractions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ToolBar({ view, setView, blocksData }) {
  const themeModeBtn = useRef(null);
  const themeModeToggle = useRef(null);
  return (
    <div className="md:h-[40px]">
      <div className="relative grid md:flex items-center text-[12px] italic gap-[10px]">
        <div className="font-bold logo-text text-[20px]">
          DRAFTIFY{" "}
          <span className="underline font-normal logo-text text-[12px]">
            Write. Create. Build your story block by block.
          </span>
        </div>
        <div className="md:absolute right-0 flex items-center gap-[10px]">
          <button
            className="border rounded-[10px] bg-(--theme-color) text-white hover:font-semibold hover:bg-(--hovered-theme-color) p-1 cursor-pointer"
            onClick={() => handleDownloadJSON(blocksData)}
          >
            Download JSON <FontAwesomeIcon icon={["fas", "download"]} />
          </button>
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
          <div className="w-[100px]">viewing {view}</div>
        </div>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { handleThemeBtnClick } from "../utils/DraftifyHooks/ToggleHooks/ToggleEffects";

export default function Toggle({ view, setView }) {
  const themeModeBtn = useRef(null);
  const themeModeToggle = useRef(null);
  return (
    <div className="relative">
      <div className="absolute right-0 flex gap-[10px] items-center text-[12px] italic">
        <div
          ref={themeModeBtn}
          className="border w-[30px] h-[16px] rounded-[16px] cursor-pointer duration-300"
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
            className="w-[12.78px] h-[12.78px] rounded-[12.78px] bg-[#232323] translate-y-[.5px] duration-300"
          ></div>
        </div>{" "}
        <div className="w-[100px]">viewing {view}</div>
      </div>
    </div>
  );
}

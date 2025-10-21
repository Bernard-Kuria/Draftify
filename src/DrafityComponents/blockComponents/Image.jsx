import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
} from "../../utils/DraftifyHooks/mediaHooks/mediaInteractions";

export default function ImageEditor({ block, onChange }) {
  const [file, setFile] = useState("");
  const output = useRef(null);
  useEffect(() => {
    window.addEventListener("dragover", (e) => e.preventDefault());
    window.addEventListener("drop", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    if (file) {
      onChange(block.id, file);
    }
  }, [file]);
  return (
    <div
      ref={output}
      onDrop={(e) => dropHandler(e, setFile)}
      onDragOver={(e) => dragHandler(e, output)}
      onDragLeave={(e) => dragLeaveHandler(e, output)}
      onMouseLeave={(e) => dragLeaveHandler(e, output)}
      onChange={() => onChange(block.id, file !== "" && file)}
      className="border-2 border-dashed h-[250px] grid items-center justify-center"
    >
      {file ? (
        <div className="w-full h-[250px] flex gap-[10px] text-blue-600 font-medium border-b border-dashed border-blue-200">
          <img src={file} alt="" className="object-cover w-full h-full" />
          <div className="h-fit border border-dashed cursor-pointer">
            <FontAwesomeIcon icon={["fas", "xmark"]} />
          </div>
        </div>
      ) : (
        <div>
          <div className="theme-color flex justify-center items-center w-[60px] h-[60px] rounded-[50%] text-[20px] text-white translate-x-[calc(50%+10px)] cursor-pointer">
            <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
          </div>
          <div className="normal-title">
            Drop your image here
            <div className="normal-text text-(--grey-secondary)">
              or click to browse
            </div>
          </div>
          <input type="file" id="file" className="hidden" />
          <label
            htmlFor="file"
            className="grid btn-theme-color px-4 py-2 rounded-[10px] text-white items-center"
          >
            Browse Files
          </label>
        </div>
      )}
    </div>
  );
}

export function ImageOutput({ block }) {
  return (
    <div key={block.id} className="border p-2 text-gray-500 text-center">
      <img src={block.content} alt="" />
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
  onFileChange,
} from "../../utils/DraftifyHooks/mediaHooks/mediaInteractions";

export default function MediaEditor({ block, onChange }) {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

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

  const fileType = fileName.split(".").pop();

  return (
    <div className="border h-[250px]">
      {file ? (
        fileType === "png" ||
        fileType === "jpg" ||
        fileType === "jpeg" ||
        fileType === "gif" ? (
          <div className="w-full h-[250px] flex gap-[10px] text-blue-600 font-medium border-blue-200">
            <img src={file} alt="" className="object-cover w-full h-full" />
            <div className="h-fit border border-dashed cursor-pointer">
              <FontAwesomeIcon
                icon={["fas", "xmark"]}
                onClick={() => {
                  setFile("");
                  setFileName("");
                }}
              />
            </div>
          </div>
        ) : fileType === "mp4" || fileType === "webm" || fileType === "ogg" ? (
          <div className="w-full h-[250px] flex gap-[10px] text-blue-600 font-medium border-b border-dashed border-blue-200">
            <video
              autoPlay
              muted
              controls
              className="object-cover w-full h-full"
            >
              <source src={file} type="video/mp4" />
            </video>
            <div className="h-fit border border-dashed cursor-pointer">
              <FontAwesomeIcon
                icon={["fas", "xmark"]}
                onClick={() => {
                  setFile("");
                  setFileName("");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-gray-500">
            <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
            <p className="text-sm font-medium">{fileName}</p>
            <FontAwesomeIcon
              icon={["fas", "xmark"]}
              onClick={() => {
                setFile("");
                setFileName("");
              }}
            />
          </div>
        )
      ) : (
        <div
          ref={output}
          onDrop={(e) => dropHandler(e, setFile, setFileName)}
          onDragOver={(e) => dragHandler(e, output)}
          onDragLeave={(e) => dragLeaveHandler(e, output)}
          onMouseLeave={(e) => dragLeaveHandler(e, output)}
          className="border-2 border-dashed w-full h-full grid items-center"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => onFileChange(e, setFile, setFileName)}
          />
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center text-center gap-[20px] btn-theme-color px-4 py-2 rounded-[10px] cursor-pointer"
          >
            <div className="border rounded-[50%] flex justify-center items-center w-[60px] h-[60px] text-[20px] cursor-pointer">
              <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
            </div>
            <div className="normal-title">
              Drop your{" "}
              {block.type === "image" ? (
                <strong>image</strong>
              ) : (
                <strong>video</strong>
              )}{" "}
              here
              <div className="normal-text text-(--grey-secondary)">
                or click to browse
              </div>
            </div>
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

export function MediaOutput({ block }) {
  return (
    <div
      key={block.id}
      className="border p-2 text-gray-500 text-center object-cover w-full h-full"
    >
      {block.content && (
        <video autoPlay muted controls>
          <source src={block.content} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

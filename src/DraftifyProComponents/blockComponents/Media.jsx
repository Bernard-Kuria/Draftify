import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
  onFileChange,
} from "../../utils/DraftifyHooks/mediaHooks/mediaInteractions";

import ProgressDonut from "../Loader";

import { mediaType } from "../../utils/conversions";

export default function MediaEditor({ block, onChange }) {
  const [info, setInfo] = useState("");
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [compressing, setCompressing] = useState(false);
  const [compressingProgress, setCompressionProgress] = useState(null);

  const output = useRef(null);
  useEffect(() => {
    window.addEventListener("dragover", (e) => e.preventDefault());
    window.addEventListener("drop", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    setInfo("To remove image or media component, refresh first.");
    if (block.content !== "") {
      setFile(block.content);
      setFileType(block.type);
    }
  }, []);

  useEffect(() => {
    onChange(block.id, file);
    if (fileName) {
      setFileType(mediaType(fileName));
    }
  }, [file]);

  const handleRefresh = () => {
    setFile("");
    setFileName("");
  };

  return (
    <div className="border w-full h-[275px]">
      {file && !compressing ? (
        fileType === "image" ? (
          <div className="relative w-full h-[275px] text-(--draftify-theme-color) font-medium border-blue-200 pb-[25px]">
            <img src={file} alt="" className="flex-1 media" />
            <div className="absolute bottom-0.5 flex gap-2 items-center w-full h-[25px] text-[12px]">
              {info && (
                <div className="text-(--draftify-theme-color)">{info}</div>
              )}
              <div
                onClick={handleRefresh}
                className="flex gap-2 border rounded-[5px] items-center px-1  bg-(--draftify-theme-color) text-white cursor-pointer"
              >
                refresh
                <FontAwesomeIcon icon={["fas", "refresh"]} />
              </div>
            </div>
          </div>
        ) : fileType === "video" || fileType === "media" ? (
          <div className="relative w-full h-[275px] text-blue-600 font-medium border-blue-200 pb-[25px]">
            <video autoPlay muted controls className="flex-1 media">
              <source src={file} type="video/mp4" />
            </video>
            <div className="absolute bottom-0.5 flex gap-2 items-center w-full h-[25px] text-[12px]">
              {info && (
                <div className="text-(--draftify-theme-color)">{info}</div>
              )}
              <div
                onClick={handleRefresh}
                className="flex gap-2 border rounded-[5px] items-center px-1  bg-(--draftify-theme-color) text-white cursor-pointer"
              >
                refresh
                <FontAwesomeIcon icon={["fas", "refresh"]} />
              </div>
            </div>
          </div>
        ) : (
          fileType === "unknown" && (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-gray-500 text-center">
              <FontAwesomeIcon icon={["fas", "file"]} size="2x" />
              <p className="text-sm font-medium">wrong format: {fileName}</p>
              <p className="text-sm font-medium">
                accepted formats: png, jpg, jpeg, gif, mp4, webm,ogg
              </p>
              <FontAwesomeIcon
                icon={["fas", "refresh"]}
                onClick={() => {
                  setFile("");
                  setFileName("");
                }}
              />
            </div>
          )
        )
      ) : compressing ? (
        <ProgressDonut progress={compressingProgress} />
      ) : (
        // File upload section
        <div
          ref={output}
          onDrop={(e) =>
            dropHandler(
              e,
              setFile,
              setFileName,
              setCompressing,
              setCompressionProgress
            )
          }
          onDragOver={(e) => dragHandler(e, output)}
          onDragLeave={(e) => dragLeaveHandler(e, output)}
          onMouseLeave={(e) => dragLeaveHandler(e, output)}
          className="border-2 border-dashed w-full h-full grid items-center"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) =>
              onFileChange(
                e,
                setFile,
                setFileName,
                setCompressing,
                setCompressionProgress
              )
            }
          />
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center text-center gap-[20px] px-4 py-2 rounded-[10px] cursor-pointer"
          >
            <div className="border rounded-[50%] flex justify-center items-center w-[60px] h-[60px] text-[20px] cursor-pointer">
              <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
            </div>
            <div className="normal-title">
              Drop your{" "}
              {block.type === "image" ? (
                <strong>image/GIF</strong>
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
    <div key={block.id}>
      <img src={block.content} alt="" className="media rounded-[10px]" />
    </div>
  );
}

export function MediaOutput({ block }) {
  return (
    <div key={block.id}>
      {block.content && (
        <video autoPlay muted controls className="rounded-[10px] media">
          <source src={block.content} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

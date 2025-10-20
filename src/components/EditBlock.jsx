import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { renderTable } from "../utils/hooks/tableHooks/tableEffects.jsx";
import {
  dropHandler,
  dragHandler,
  dragLeaveHandler,
} from "../utils/hooks/imageHooks/imageInteractions.jsx";

export default function EditBlock({
  tableContent,
  setTableContent,
  block,
  onChange,
}) {
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
    <div>
      {block.type === "heading" ? (
        <input
          type="text"
          className="heading w-full border-b outline-none"
          placeholder="Heading..."
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
        />
      ) : block.type === "paragraph" ? (
        <textarea
          className="paragraph w-full border-b outline-none"
          placeholder="Write something..."
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
        />
      ) : block.type === "quote" ? (
        <input
          type="text"
          className="quote w-full border-b outline-none"
          placeholder="Heading..."
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
        />
      ) : block.type === "list" ? (
        <input
          type="text"
          className="paragraph w-full border-b outline-none"
          placeholder="list item..."
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
        />
      ) : block.type === "table" ? (
        <div>
          {tableContent.head.length > 0 && (
            <div className="mt-4">
              <table>
                <thead>
                  <tr>
                    {[...tableContent.head].map((cell, idx) => (
                      <th key={idx} className="border p-2">
                        <input
                          type="text"
                          className="outline-none w-full"
                          value={cell.content}
                          onChange={(e) => {
                            const updatedHead = tableContent.head.map((h) =>
                              h.id === cell.id
                                ? { ...h, content: e.target.value }
                                : h
                            );
                            setTableContent({
                              ...tableContent,
                              head: updatedHead,
                            });
                          }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renderTable(
                    tableContent,
                    setTableContent,
                    tableContent.body
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : block.type === "image" ? (
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
      ) : block.type === "media" ? (
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
              <video
                autoPlay
                muted
                controls
                className="object-cover w-full h-full"
              >
                <source src={file} type="video/mp4" />
              </video>
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
                Drop your video here
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
      ) : block.type === "link" ? (
        <input
          type="text"
          placeholder="Enter link..."
          className="border-b w-full outline-none"
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
        />
      ) : block.type === "code" ? (
        <textarea
          className="font-mono bg-black text-white p-2 w-full"
          placeholder="Code block..."
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
        />
      ) : null}
    </div>
  );
}

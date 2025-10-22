import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDraftify } from "./utils/useDraftify";

import EditBlock from "./DrafityComponents/EditBlock";
import Options from "./DrafityComponents/Options";
import OutputBlock from "./DrafityComponents/OutputBlock";
import ToolBar from "./DrafityComponents/ToolBar";

import "./utils/icons";
import "./Draftify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Grabber from "./DrafityComponents/Grabber";

export default function Draftify() {
  const [view, setView] = useState("editor");

  const {
    blocksData,
    handleClick,
    handleChange,
    handleTableChange,
    handleDelete,
    onDropHandler,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    containerVariants,
    itemVariants,
    transitions,
    whileHover,
  } = useDraftify([]);

  return (
    <div className="p-[10px] md:flex flex-col justify-center items-center min-h-[100vh] md:mt-[20px]">
      <div className="flex flex-col md:gap-[10px] gap-[20px] w-full md:w-[90%] min-h-[100vh] md:min-h-[400px] h-fit md:border border-(--theme-color) rounded-2xl md:p-5">
        <ToolBar view={view} setView={setView} blocksData={blocksData} />

        {view === "editor" && (
          <>
            <Options handleClick={handleClick} />
            <div
              className="flex-1 border border-(--theme-color) rounded-2xl md:p-5 p-[10px_0]"
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.div
                className="grid gap-[10px]"
                variants={containerVariants}
                animate="show"
                exit="hidden"
              >
                <AnimatePresence>
                  {blocksData.map((b, index) => (
                    <motion.div
                      key={b.id}
                      layout
                      variants={itemVariants}
                      transition={transitions}
                      whileHover={whileHover}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragEnd={(e) => onDragEnd(e)}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => onDragEnter(e)}
                      onDragLeave={(e) => onDragLeave(e)}
                      onDrop={(e) => onDropHandler(e, index)}
                      className="flex items-center gap-[5px] rounded-md p-[5px] transition-colors"
                    >
                      <Grabber />
                      <EditBlock
                        block={b}
                        onChange={handleChange}
                        onTableChange={handleTableChange}
                      />

                      <FontAwesomeIcon
                        icon={["fas", "trash"]}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(b.id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}

        {view === "preview" && (
          <div
            className="flex-1 grid gap-[10px] border border-(--theme-color) rounded-2xl p-3 md:p-5 bg-white"
            onSubmit={(e) => e.preventDefault()}
          >
            <OutputBlock blocksData={blocksData} />
          </div>
        )}
      </div>
    </div>
  );
}

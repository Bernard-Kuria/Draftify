// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditBlock from "./DraftifyProComponents/EditBlock";
import Options from "./DraftifyProComponents/Options";
import OutputBlock from "./DraftifyProComponents/OutputBlock";
import ToolBar from "./DraftifyProComponents/ToolBar";
import Grabber from "./DraftifyProComponents/Grabber";
import BackGround from "./DraftifyProComponents/Background";

import "./utils/icons";
import "./Draftify.css";

import { useDraftify } from "./utils/useDraftify";
import { useGenerateGrid } from "./utils/DraftifyHooks/BackgroundHooks/backGroundEffects";

export default function Draftify() {
  const [view, setView] = useState("editor");
  const [gridDots, setGridDots] = useState([]);

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

  useGenerateGrid(setGridDots);

  return (
    <>
      <BackGround gridDots={gridDots} />
      <div className="flex flex-col md:gap-2.5 gap-5 w-full min-h-[450px] h-fit border border-(--draftify-theme-color) rounded-2xl p-2 md:p-5 bg-white">
        <ToolBar view={view} setView={setView} blocksData={blocksData} />

        {view === "editor" && (
          <>
            <Options handleClick={handleClick} />
            <div
              className="flex-1 border border-(--draftify-theme-color) rounded-2xl md:p-5 p-[2.5_0]"
              onSubmit={(e) => e.preventDefault()}
            >
              <motion.div
                className="grid gap-2.5"
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
            className="grid gap-2.5 border border-(--draftify-theme-color) rounded-2xl p-3 md:p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <OutputBlock blocksData={blocksData} />
          </div>
        )}
      </div>
    </>
  );
}

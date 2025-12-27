import { useState } from "react";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditBlock from "./components/EditBlock";
import Options from "./components/Options";
import OutputBlock from "./components/OutputBlock";
import ToolBar from "./components/ToolBar";
import Grabber from "./components/Grabber";
import BackGround from "./components/Background";

import { useDraftify } from "./hooks/useDraftify";
import { useGenerateGrid } from "./hooks/backgroundHooks/backGroundEffects";

import "./utils/icons";

import "./Draftify.css";

export default function DraftifyReact() {
  const [view, setView] = useState("editor");
  const [gridDots, setGridDots] = useState([]);

  const {
    blocksData,

    // block creator
    handleClick,

    // block modifiers
    modifyHeading,
    modifySubheading,
    modifyParagraph,
    modifyQuote,
    modifyList,
    modifyTable,
    modifyImage,
    modifyVideo,
    modifyLink,
    modifyCode,

    // block delete
    handleDelete,

    // drag and drop handlers
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

      <div className="draftify-container">
        <ToolBar view={view} setView={setView} blocksData={blocksData} />

        {view === "editor" && (
          <>
            <Options handleClick={handleClick} />
            <div className="editor-area" onSubmit={(e) => e.preventDefault()}>
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
                      className="block-container"
                    >
                      <Grabber />

                      <EditBlock
                        block={b}
                        modifyHeading={modifyHeading}
                        modifySubheading={modifySubheading}
                        modifyParagraph={modifyParagraph}
                        modifyQuote={modifyQuote}
                        modifyList={modifyList}
                        modifyTable={modifyTable}
                        modifyImage={modifyImage}
                        modifyVideo={modifyVideo}
                        modifyLink={modifyLink}
                        modifyCode={modifyCode}
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
          <div className="output-area" onSubmit={(e) => e.preventDefault()}>
            <OutputBlock blocksData={blocksData} />
          </div>
        )}
      </div>
    </>
  );
}

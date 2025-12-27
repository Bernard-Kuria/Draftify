import { useState, useEffect } from "react";

import { imageToBase64 } from "../../draftify/draftify-lib/copyToClipboard";

import {
  createHeadingBlock,
  createSubheadingBlock,
  createParagraphBlock,
  createQuoteBlock,
  createListBlock,
  createTableBlock,
  createImageBlock,
  createVideoBlock,
  createLinkBlock,
  createCodeBlock,
} from "../../draftify/draftify-core/draftify.block.creator";

import {
  modifyHeadingBlock,
  modifySubheadingBlock,
  modifyParagraphBlock,
  modifyQuoteBlock,
  modifyListBlock,
  modifyTableBlock,
  modifyImageBlock,
  modifyVideoBlock,
  modifyLinkBlock,
  modifyCodeBlock,
} from "../../draftify/draftify-core/draftify.block.modifier";

export function useDraftify(initialBlocks = []) {
  // Blocks initialization and fetching
  const [blocksData, modifyBlocks] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("blocksData");
      return saved ? JSON.parse(saved) : initialBlocks;
    }
    return initialBlocks; // server fallback
  });

  // Save to localStorage whenever blocksData changes
  useEffect(() => {
    const saveBlockData = async (blocks) => {
      const blocksCopy = await Promise.all(
        blocks.map(async (b) => {
          if (b.type === "image" && b.file) {
            const base64 = await imageToBase64(b);
            return { ...b, content: base64, file: undefined };
          }
          return b;
        })
      );
      localStorage.setItem("blocksData", JSON.stringify(blocksCopy));
    };

    saveBlockData(blocksData);
  }, [blocksData]);

  // Creating a block

  const handleClick = (type, cells) => {
    switch (type) {
      case "heading":
        modifyBlocks((prev) => [...prev, createHeadingBlock()]);
        break;
      case "subheading":
        modifyBlocks((prev) => [...prev, createSubheadingBlock()]);
        break;
      case "paragraph":
        modifyBlocks((prev) => [...prev, createParagraphBlock()]);
        break;
      case "quote":
        modifyBlocks((prev) => [...prev, createQuoteBlock()]);
        break;
      case "list":
        modifyBlocks((prev) => [...prev, createListBlock()]);
        break;
      case "table":
        modifyBlocks((prev) => [...prev, createTableBlock(cells)]);
        break;
      case "image":
        modifyBlocks((prev) => [...prev, createImageBlock()]);
        break;
      case "video":
        modifyBlocks((prev) => [...prev, createVideoBlock()]);
        break;
      case "link":
        modifyBlocks((prev) => [...prev, createLinkBlock()]);
        break;
      case "code":
        modifyBlocks((prev) => [...prev, createCodeBlock()]);
        break;

      default:
        break;
    }
  };

  // Modifying a block

  const modifyHeading = ({ headingBlockId, newContent, level }) => {
    modifyBlocks((prev) =>
      modifyHeadingBlock(prev, headingBlockId, newContent, level)
    );
  };

  const modifySubheading = ({ subheadingBlockId, newContent }) => {
    modifyBlocks((prev) =>
      modifySubheadingBlock(prev, subheadingBlockId, newContent)
    );
  };

  const modifyParagraph = ({ paragraphBlockId, newContent }) => {
    modifyBlocks((prev) =>
      modifyParagraphBlock(prev, paragraphBlockId, newContent)
    );
  };

  const modifyQuote = ({ quoteBlockId, newContent, author }) => {
    modifyBlocks((prev) =>
      modifyQuoteBlock(prev, quoteBlockId, newContent, author)
    );
  };

  const modifyList = ({ listBlockId, listStyle, items }) => {
    modifyBlocks((prev) =>
      modifyListBlock(prev, listBlockId, listStyle, items)
    );
  };

  const modifyTable = ({ tableBlockId, tableContent }) => {
    modifyBlocks((prev) => modifyTableBlock(prev, tableBlockId, tableContent));
  };

  const modifyImage = ({ imageBlockId, src, alt, caption }) => {
    modifyBlocks((prev) =>
      modifyImageBlock(prev, imageBlockId, src, alt, caption)
    );
  };

  const modifyVideo = ({ videoBlockId, src, provider }) => {
    modifyBlocks((prev) => modifyVideoBlock(prev, videoBlockId, src, provider));
  };

  const modifyLink = ({ linkBlockId, linkText, url }) => {
    modifyBlocks((prev) => modifyLinkBlock(prev, linkBlockId, linkText, url));
  };

  const modifyCode = ({ codeBlockId, language, code }) => {
    modifyBlocks((prev) => modifyCodeBlock(prev, codeBlockId, language, code));
  };

  // Deleting a block
  const handleDelete = (id) => {
    const block = blocksData.find((block) => block.id === id);

    // ensure media block is deleted only if no media is uploaded
    if (
      (block.type === "image" || block.type === "video") &&
      block.data.src !== ""
    )
      return;

    modifyBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  // Blocks reordering and UI improvement functions
  const handleReorder = (dragIndex, hoverIndex) => {
    modifyBlocks((prev) => {
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, dragged);
      return updated;
    });
  };

  const onDropHandler = (e, index) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-100");
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const hoverIndex = index;
    if (dragIndex !== hoverIndex) handleReorder(dragIndex, hoverIndex);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    e.currentTarget.style.opacity = "0.5";
  };

  const onDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  const onDragEnter = (e) => {
    e.currentTarget.classList.add("bg-gray-100");
  };

  const onDragLeave = (e) => {
    e.currentTarget.classList.remove("bg-gray-100");
  };

  const containerVariants = {
    show: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const transitions = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  };

  const whileHover = {
    scale: 1.02,
    backgroundColor: "rgba(243, 244, 246, 0.8)", // gray-100 translucent
  };

  return {
    blocksData,
    modifyBlocks,
    handleClick,

    // modifiers
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

    handleDelete,
    handleReorder,
    onDropHandler,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    containerVariants,
    itemVariants,
    transitions,
    whileHover,
  };
}

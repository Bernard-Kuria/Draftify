import { useState, useEffect } from "react";

import { imageToBase64 } from "../DraftifyHooks/ToolBarHooks/ToolBarInteractions";

import { createParagraphBlock } from "../draftify-core/createParagraphBlock";

import { createHeadingBlock } from "../draftify-core/createHeadingBlock";

import { createSubheadingBlock } from "../draftify-core/createSubheadingBlock";

import { createQuoteBlock } from "../draftify-core/createQuoteBlock";

import { createListBlock } from "../draftify-core/createListBlock";

import { createTableBlock } from "../draftify-core/createTableBlock";

import { createImageBlock } from "../draftify-core/createImageBlock";

import { createVideoBlock } from "../draftify-core/createVideoBlock";

import { createLinkBlock } from "../draftify-core/createLinkBlock";

import { createCodeBlock } from "../draftify-core/createCodeBlock";

export function useDraftify(initialBlocks = []) {
  const [blocksData, setBlocksData] = useState(() => {
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

  const handleClick = (type, cells) => {
    switch (type) {
      case "heading":
        setBlocksData((prev) => [...prev, createHeadingBlock()]);
        break;
      case "subheading":
        setBlocksData((prev) => [...prev, createSubheadingBlock()]);
        break;
      case "paragraph":
        setBlocksData((prev) => [...prev, createParagraphBlock()]);
        break;
      case "quote":
        setBlocksData((prev) => [...prev, createQuoteBlock()]);
        break;
      case "list":
        setBlocksData((prev) => [...prev, createListBlock()]);
        break;
      case "table":
        setBlocksData((prev) => [...prev, createTableBlock(cells)]);
        break;
      case "image":
        setBlocksData((prev) => [...prev, createImageBlock()]);
        break;
      case "video":
        setBlocksData((prev) => [...prev, createVideoBlock()]);
        break;
      case "link":
        setBlocksData((prev) => [...prev, createLinkBlock()]);
        break;
      case "code":
        setBlocksData((prev) => [...prev, createCodeBlock()]);
        break;

      default:
        break;
    }
  };

  const handleChange = (
    id,
    newContent,
    url,
    level,
    author,
    style,
    items,
    newTable,
    src,
    alt,
    caption,
    provider,
    text,
    language,
    code
  ) => {
    setBlocksData((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          switch (b.type) {
            case "heading":
              return { ...b, data: { text: newContent, level: level } };
            case "subheading":
              return { ...b, data: { text: newContent } };
            case "paragraph":
              return { ...b, data: { text: newContent } };
            case "quote":
              return { ...b, data: { text: newContent, author: author } };
            case "list":
              return { ...b, data: { style: style, items: items } };
            case "table":
              return { ...b, data: newTable };
            case "image":
              return { ...b, data: { src: src, alt: alt, caption: caption } };
            case "video":
              return { ...b, data: { src: src, provider: provider } };
            case "link":
              return { ...b, data: { text: text, url: url } };
            case "code":
              return { ...b, data: { language: language, code: code } };
            default:
              break;
          }
        } else return b;
      })
    );
  };

  const handleDelete = (id) => {
    const block = blocksData.find((block) => block.id === id);

    // ensure media block is deleted only if no media is uploaded
    if (
      (block.type === "image" || block.type === "video") &&
      block.content !== ""
    )
      return;

    setBlocksData((prev) => prev.filter((b) => b.id !== id));
  };

  const handleReorder = (dragIndex, hoverIndex) => {
    setBlocksData((prev) => {
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
    setBlocksData,
    handleClick,
    handleChange,
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

import { useState } from "react";
import { nanoid } from "nanoid";

import { newContentTable } from "./DraftifyHooks/tableHooks/tableInteractions";

export function useDraftify(initialBlocks = []) {
  const [blocksData, setBlocksData] = useState(initialBlocks);

  const handleClick = (block, cells) => {
    let newTableContent;

    if (block.type === "table") newTableContent = newContentTable(cells);

    setBlocksData((prev) => [
      ...prev,
      {
        id: nanoid(),
        type: block.type,
        content: "",
        tableContent: newTableContent || null,
        cells:
          block.type === "table" ? cells || { rows: 2, cols: 2 } : undefined,
      },
    ]);
  };

  const handleChange = (id, newContent) => {
    setBlocksData((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: newContent } : b))
    );
  };

  const handleTableChange = (id, newTable) => {
    setBlocksData((prev) =>
      prev.map((b) => (b.id === id ? { ...b, tableContent: newTable } : b))
    );
  };

  const handleDelete = (id) => {
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
    handleClick,
    handleChange,
    handleTableChange,
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

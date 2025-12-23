export function newContentTable(cells) {
  const rows = cells?.rows || 2;
  const cols = cells?.cols || 2;

  return {
    head: Array.from({ length: cols }, (_, col) => ({
      id: col,
      content: "",
    })),
    body: Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols }, (_, col) => ({
        id: [row, col],
        content: "",
      }))
    ).flat(),
  };
}

export function renderTable(block, setBlocksData) {
  const { data } = block;

  if (!data?.body?.length) return null;

  const cells = {
    rows: data.body.at(-1)?.id[0] ?? 0,
    cols: data.body.at(-1)?.id[1] ?? 0,
  };

  const rows = [];

  for (let i = 0; i <= cells.rows; i++) {
    const tableCells = [];
    for (let j = 0; j <= cells.cols; j++) {
      tableCells.push(
        <td key={`${i}-${j}`} className="border p-2">
          <input
            type="text"
            className="outline-none w-full"
            placeholder={`Row ${i + 1}, Col ${j + 1}`}
            value={
              data.body.find((cell) => cell.id[0] === i && cell.id[1] === j)
                ?.content || ""
            }
            onChange={(e) => {
              const updatedBody = data.body.map((cell) =>
                cell.id[0] === i && cell.id[1] === j
                  ? { ...cell, content: e.target.value }
                  : cell
              );

              const updatedTable = { ...data, body: updatedBody };

              setBlocksData((prev) =>
                prev.map((b) =>
                  b.id === block.id ? { ...b, data: updatedTable } : b
                )
              );
            }}
          />
        </td>
      );
    }
    rows.push(<tr key={i}>{tableCells}</tr>);
  }

  return rows;
}

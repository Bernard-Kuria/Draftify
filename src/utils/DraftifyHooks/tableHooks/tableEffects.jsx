export function renderTable(block, onTableChange) {
  const { tableContent } = block;

  if (!tableContent?.body?.length) return null;

  const cells = {
    rows: tableContent.body.at(-1)?.id[0] ?? 0,
    cols: tableContent.body.at(-1)?.id[1] ?? 0,
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
              tableContent.body.find(
                (cell) => cell.id[0] === i && cell.id[1] === j
              )?.content || ""
            }
            onChange={(e) => {
              const updatedBody = tableContent.body.map((cell) =>
                cell.id[0] === i && cell.id[1] === j
                  ? { ...cell, content: e.target.value }
                  : cell
              );

              const updatedTable = { ...tableContent, body: updatedBody };

              onTableChange(block.id, updatedTable);
            }}
          />
        </td>
      );
    }
    rows.push(<tr key={i}>{tableCells}</tr>);
  }

  return rows;
}

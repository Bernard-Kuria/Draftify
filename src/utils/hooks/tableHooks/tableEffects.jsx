export function renderTable(tableContent, setTableContent, body) {
  const cells = {
    rows: body.at(-1).id[0],
    cols: body.at(-1).id[1],
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
            onChange={(e) => {
              const initialBody = tableContent.body;
              const updatedBody = initialBody.map((cell) => {
                if (cell.id[0] === i && cell.id[1] === j) {
                  return { ...cell, content: e.target.value };
                }
                return cell;
              });
              setTableContent((prev) => {
                return { ...prev, body: updatedBody };
              });
            }}
          />
        </td>
      );
    }
    rows.push(<tr key={i}>{tableCells}</tr>);
  }
  return rows;
}

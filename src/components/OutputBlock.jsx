export default function OutputBlock({ blocksData }) {
  return (
    <div className="grid gap-[10px] border border-gray-600 rounded-2xl p-5 h-fit">
      <div>
        {blocksData.length !== 0 &&
          blocksData.map((b) => {
            switch (b.type) {
              case "heading":
                return (
                  <h2
                    key={b.id}
                    className="heading w-full border-b outline-none"
                  >
                    {b.content}
                  </h2>
                );
              case "paragraph":
                return (
                  <p
                    key={b.id}
                    className="paragraph w-full border-b outline-none"
                  >
                    {b.content}
                  </p>
                );
              case "quote":
                return (
                  <blockquote key={b.id} className="italic border-l-4 pl-2">
                    {b.content}
                  </blockquote>
                );
              case "list":
                return (
                  <ul key={b.id} className="list-disc pl-5">
                    {b.content.split(",").map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                );
              case "table":
                console.log();
                return <TableBlock key={b.id} block={b} />;
              case "image":
                return (
                  <div
                    key={b.id}
                    className="border p-2 text-gray-500 text-center"
                  >
                    <img src={b.content} alt="" />
                  </div>
                );
              case "media":
                console.log(b.content);
                return (
                  <div
                    key={b.id}
                    className="border p-2 text-gray-500 text-center"
                  >
                    {b.content && (
                      <video autoPlay muted controls>
                        <source src={b.content} type="video/mp4" />
                      </video>
                    )}
                  </div>
                );
              case "link":
                return (
                  <a
                    key={b.id}
                    href={b.url}
                    className="border-b w-full outline-none"
                  >
                    {b.content}
                  </a>
                );
              case "code":
                return (
                  <pre
                    key={b.id}
                    className="font-mono bg-black text-white p-2 w-full whitespace-pre-wrap"
                  >
                    <code>{b.content}</code>
                  </pre>
                );
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}

function TableBlock({ block }) {
  if (
    !block.tableContent ||
    !block.tableContent.head ||
    !block.tableContent.body
  ) {
    return null;
  }

  const { head, body } = block.tableContent;

  const numCols = head.length;
  const groupedBody = body.reduce((acc, cell, index) => {
    const rowIndex = Math.floor(index / numCols);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(cell);
    return acc;
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr>
          {head.map((cell) => (
            <th key={cell.id} className="border p-2">
              {cell.content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {groupedBody.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell) => (
              <td key={cell.id.join("-")} className="border p-2">
                {cell.content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

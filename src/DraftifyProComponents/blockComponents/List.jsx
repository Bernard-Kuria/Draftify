export default function ListEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="border-b w-full list"
      placeholder="list item..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function ListOutput({ block }) {
  return (
    <ul key={block.id} className="list-disc pl-5 list">
      {block.content.split(",").map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

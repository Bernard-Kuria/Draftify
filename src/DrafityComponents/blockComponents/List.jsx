export default function ListEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="paragraph w-full border-b outline-none"
      placeholder="list item..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function ListOutput({ block }) {
  return (
    <ul key={block.id} className="list-disc pl-5">
      {block.content.split(",").map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

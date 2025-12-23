export default function HeadingEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="border-b heading"
      placeholder="Heading..."
      autoFocus
      value={block.data.text}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function HeadingOutput({ block }) {
  return (
    <h2 key={block.id} className="heading">
      {block.data.text}
    </h2>
  );
}

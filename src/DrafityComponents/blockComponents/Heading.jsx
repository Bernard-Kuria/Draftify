export default function HeadingEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="w-full border-b outline-none"
      placeholder="Heading..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function HeadingOutput({ block }) {
  return (
    <h2 key={block.id} className="w-full outline-none text-2xl font-semibold">
      {block.content}
    </h2>
  );
}

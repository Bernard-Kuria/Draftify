export default function LinkEditor({ block, onChange }) {
  return (
    <input
      type="text"
      placeholder="Enter link..."
      className="border-b w-full outline-none"
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function LinkOutput({ block }) {
  return (
    <a
      key={block.id}
      href={block.url}
      className="text-blue-500border-b w-full outline-none"
    >
      {block.content}
    </a>
  );
}

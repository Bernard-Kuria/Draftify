export default function LinkEditor({ block, onChange }) {
  return (
    <input
      type="text"
      placeholder="Enter link..."
      className="border-b link"
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function LinkOutput({ block }) {
  return (
    <a key={block.id} href={block.url} className="link">
      {block.content}
    </a>
  );
}

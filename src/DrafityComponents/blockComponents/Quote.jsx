export default function QuoteEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="w-full border-b border-l-4 outline-none text-[18px] font-semibold italic pl-2"
      placeholder="Quote..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function QuoteOutput({ block }) {
  return (
    <blockquote
      key={block.id}
      className="w-full border-l-4 outline-none text-[18px] font-semibold italic pl-2"
    >
      {block.content}
    </blockquote>
  );
}

export default function QuoteEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="border-b quote"
      placeholder="Quote..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function QuoteOutput({ block }) {
  return (
    <blockquote key={block.id} className="quote">
      {block.content}
    </blockquote>
  );
}

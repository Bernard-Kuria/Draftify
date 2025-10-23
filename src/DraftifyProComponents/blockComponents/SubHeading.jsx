export default function SubHeadingEditor({ block, onChange }) {
  return (
    <input
      type="text"
      className="border-b subheading"
      placeholder="Sub Heading..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function SubHeadingOutput({ block }) {
  return (
    <h2 key={block.id} className="subheading">
      {block.content}
    </h2>
  );
}

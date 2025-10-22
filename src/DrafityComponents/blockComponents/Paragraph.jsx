export default function ParagraphEditor({ block, onChange }) {
  return (
    <textarea
      className="border-b paragraph"
      placeholder="Write something..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function ParagraphOutput({ block }) {
  return (
    <p key={block.id} className="paragraph">
      {block.content}
    </p>
  );
}

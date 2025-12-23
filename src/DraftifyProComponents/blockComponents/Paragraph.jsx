export default function ParagraphEditor({ block, onChange }) {
  return (
    <textarea
      className="border-b paragraph"
      placeholder="Write something..."
      autoFocus
      value={block.data.text}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function ParagraphOutput({ block }) {
  return (
    <p key={block.id} className="paragraph">
      {block.data.text}
    </p>
  );
}

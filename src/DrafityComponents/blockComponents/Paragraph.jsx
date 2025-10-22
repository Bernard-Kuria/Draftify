export default function ParagraphEditor({ block, onChange }) {
  return (
    <textarea
      className="text-[18px] font-semibold w-full border-b outline-none"
      placeholder="Write something..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function ParagraphOutput({ block }) {
  return (
    <p key={block.id} className="w-full outline-none">
      {block.content}
    </p>
  );
}

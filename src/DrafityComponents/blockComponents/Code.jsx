export default function CodeEditor({ block, onChange }) {
  return (
    <textarea
      className="font-mono bg-black text-white p-2 w-full"
      placeholder="Code block..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function CodeOutput({ block }) {
  return (
    <pre
      key={block.id}
      className="font-mono bg-black text-white p-2 w-full whitespace-pre-wrap"
    >
      <code>{block.content}</code>
    </pre>
  );
}

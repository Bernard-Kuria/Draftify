export default function CodeEditor({ block, onChange }) {
  return (
    <textarea
      className="code"
      placeholder="Code block..."
      value={block.content}
      onChange={(e) => onChange(block.id, e.target.value)}
    />
  );
}

export function CodeOutput({ block }) {
  return (
    <pre key={block.id} className="code">
      <code>{block.content}</code>
    </pre>
  );
}

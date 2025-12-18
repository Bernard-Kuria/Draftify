import { useState, useEffect } from "react";

export default function LinkEditor({ block, onChange }) {
  const [link, setLink] = useState(block.content);
  const [url, setUrl] = useState(block.url);

  useEffect(() => {
    onChange(block.id, link, url);
  }, [link, url]);

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Enter link text..."
        className="border-b link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span>[</span>
      <input
        type="url"
        placeholder="url"
        className="border-b link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <span>]</span>
    </div>
  );
}

export function LinkOutput({ block }) {
  return (
    <a key={block.id} href={block.url} className="link">
      {block.content}
    </a>
  );
}

import HeadingEditor from "./blockComponents/Heading.jsx";
import SubHeadingEditor from "./blockComponents/SubHeading.jsx";
import ParagraphEditor from "./blockComponents/Paragraph.jsx";
import ListEditor from "./blockComponents/List.jsx";
import QuoteEditor from "./blockComponents/Quote.jsx";
import TableEditor from "./blockComponents/Table.jsx";
import MediaEditor from "./blockComponents/Media.jsx";
import LinkEditor from "./blockComponents/Link.jsx";
import CodeEditor from "./blockComponents/Code.jsx";

export default function EditBlock({ block, onChange, onTableChange }) {
  switch (block.type) {
    case "heading":
      return <HeadingEditor block={block} onChange={onChange} />;
    case "subheading":
      return <SubHeadingEditor block={block} onChange={onChange} />;
    case "paragraph":
      return <ParagraphEditor block={block} onChange={onChange} />;
    case "quote":
      return <QuoteEditor block={block} onChange={onChange} />;
    case "list":
      return <ListEditor block={block} onChange={onChange} />;
    case "table":
      return <TableEditor block={block} onTableChange={onTableChange} />;
    case "image":
      return <MediaEditor block={block} onChange={onChange} />;
    case "media":
      return <MediaEditor block={block} onChange={onChange} />;
    case "link":
      return <LinkEditor block={block} onChange={onChange} />;
    case "code":
      return <CodeEditor block={block} onChange={onChange} />;
    default:
      return null;
  }
}

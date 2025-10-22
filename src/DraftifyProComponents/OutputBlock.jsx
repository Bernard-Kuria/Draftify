import { HeadingOutput } from "./blockComponents/Heading";
import { ParagraphOutput } from "./blockComponents/Paragraph";
import { QuoteOutput } from "./blockComponents/Quote";
import { ListOutput } from "./blockComponents/List";
import { TableOutput } from "./blockComponents/Table";
import { ImageOutput } from "./blockComponents/Media";
import { MediaOutput } from "./blockComponents/Media";
import { LinkOutput } from "./blockComponents/Link";
import { CodeOutput } from "./blockComponents/Code";

export default function OutputBlock({ blocksData }) {
  return (
    blocksData.length !== 0 &&
    blocksData.map((b) => {
      switch (b.type) {
        case "heading":
          return <HeadingOutput key={b.id} block={b} />;
        case "paragraph":
          return <ParagraphOutput key={b.id} block={b} />;
        case "quote":
          return <QuoteOutput key={b.id} block={b} />;
        case "list":
          return <ListOutput key={b.id} block={b} />;
        case "table":
          return <TableOutput key={b.id} block={b} />;
        case "image":
          return <ImageOutput key={b.id} block={b} />;
        case "media":
          return <MediaOutput key={b.id} block={b} />;
        case "link":
          return <LinkOutput key={b.id} block={b} />;
        case "code":
          return <CodeOutput key={b.id} block={b} />;
        default:
          return null;
      }
    })
  );
}

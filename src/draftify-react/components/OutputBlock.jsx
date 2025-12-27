import { HeadingOutput } from "../components/blockComponents/Heading";
import { SubheadingOutput } from "../components/blockComponents/Subheading";
import { ParagraphOutput } from "../components/blockComponents/Paragraph";
import { QuoteOutput } from "../components/blockComponents/Quote";
import { ListOutput } from "../components/blockComponents/List";
import { TableOutput } from "../components/blockComponents/Table";
import { ImageOutput } from "../components/blockComponents/Media";
import { VideoOutput } from "../components/blockComponents/Media";
import { LinkOutput } from "../components/blockComponents/Link";
import { CodeOutput } from "../components/blockComponents/Code";

export default function OutputBlock({ blocksData }) {
  return (
    blocksData.length !== 0 &&
    blocksData.map((block) => {
      switch (block.type) {
        case "heading":
          return <HeadingOutput key={block.id} headingBlock={block} />;
        case "subheading":
          return <SubheadingOutput key={block.id} subheadingBlock={block} />;
        case "paragraph":
          return <ParagraphOutput key={block.id} paragraphBlock={block} />;
        case "quote":
          return <QuoteOutput key={block.id} quoteBlock={block} />;
        case "list":
          return <ListOutput key={block.id} listBlock={block} />;
        case "table":
          return <TableOutput key={block.id} tableBlock={block} />;
        case "image":
          return <ImageOutput key={block.id} imageBlock={block} />;
        case "video":
          return <VideoOutput key={block.id} videoBlock={block} />;
        case "link":
          return <LinkOutput key={block.id} linkBlock={block} />;
        case "code":
          return <CodeOutput key={block.id} codeBlock={block} />;
        default:
          return null;
      }
    })
  );
}

import { ImageBlock } from "../../schema/draftify.schema";

export function normalizeImageBlock(block: ImageBlock): ImageBlock {
  return {
    ...block,
    type: "image",
    data: {
      src: typeof block.data?.src === "string" ? block.data.src : "",
      alt:
        typeof block.data?.alt === "string" ? block.data.alt : undefined,
      caption:
        typeof block.data?.caption === "string"
          ? block.data.caption
          : undefined,
    },
  };
}

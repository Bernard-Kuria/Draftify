import { ImageBlock } from "../../schema/draftify.schema";

export function normalizeImageBlock(block: ImageBlock): ImageBlock {
  return {
    ...block,
    type: "image",
    data: {
      src: typeof block.data?.src === "string" ? block.data.src.trim() : "",
      alt:
        typeof block.data?.alt === "string" ? block.data.alt.trim() : undefined,
      caption:
        typeof block.data?.caption === "string"
          ? block.data.caption.trim()
          : undefined,
    },
  };
}

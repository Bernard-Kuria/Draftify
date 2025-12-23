import { ImageBlock } from "../schema/draftify.schema";

export function createImageBlock(
  src: string,
  alt: string,
  caption: string
): ImageBlock {
  return {
    id: crypto.randomUUID(),
    type: "image",
    createdAt: new Date().toISOString(),
    data: {
      src: src,
      alt: alt,
      caption: caption,
    },
  };
}

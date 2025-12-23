import { VideoBlock } from "../schema/draftify.schema";

export function createVideoBlock(
  src: string,
  provider: "youtube" | "vimeo" | "custom" | undefined
): VideoBlock {
  return {
    id: crypto.randomUUID(),
    type: "video",
    createdAt: new Date().toISOString(),
    data: {
      src: src,
      provider: provider,
    },
  };
}

import { VideoBlock } from "../../schema/draftify.schema";

export function normalizeVideoBlock(block: VideoBlock): VideoBlock {
  return {
    ...block,
    type: "video",
    data: {
      src: typeof block.data?.src === "string" ? block.data.src : "",
      provider:
        block.data?.provider === "youtube" || block.data?.provider === "vimeo"
          ? block.data.provider
          : "custom",
    },
  };
}

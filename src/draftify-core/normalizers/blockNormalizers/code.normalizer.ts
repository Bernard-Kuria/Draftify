import { CodeBlock } from "../../schema/draftify.schema";

export function normalizeCodeBlock(block: CodeBlock): CodeBlock {
  return {
    ...block,
    type: "code",
    data: {
      language:
        typeof block.data?.language === "string"
          ? block.data.language
          : undefined,
      code: typeof block.data?.code === "string" ? block.data.code : "",
    },
  };
}

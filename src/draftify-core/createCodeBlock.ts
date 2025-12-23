import { CodeBlock } from "../schema/draftify.schema";

export function createCodeBlock(
  language: string | undefined,
  code: string
): CodeBlock {
  return {
    id: crypto.randomUUID(),
    type: "code",
    createdAt: new Date().toISOString(),
    data: {
      language: language,
      code: code,
    },
  };
}

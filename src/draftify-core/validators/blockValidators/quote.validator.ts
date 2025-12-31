import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateQuoteBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "quote") {
    errors.push({ path: "type", message: "Expected block type 'quote'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "Quote requires a data object" });
  } else {
    if (!isString(block.data.text)) {
      errors.push({
        path: "data.text",
        message: "Quote text must be a string",
      });
    }

    if (block.data.author !== undefined && !isString(block.data.author)) {
      errors.push({
        path: "data.author",
        message: "Quote author must be a string if provided",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

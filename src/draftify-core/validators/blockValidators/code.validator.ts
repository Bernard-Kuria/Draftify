import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateCodeBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "code") {
    errors.push({ path: "type", message: "Expected block type 'code'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "Code block requires a data object" });
  } else {
    if (!isString(block.data.code)) {
      errors.push({
        path: "data.code",
        message: "Code content must be a string",
      });
    }

    if (block.data.language !== undefined && !isString(block.data.language)) {
      errors.push({
        path: "data.language",
        message: "Language must be a string if provided",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateTableBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "table") {
    errors.push({ path: "type", message: "Expected block type 'table'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "Table requires a data object" });
  } else {
    if (
      !Array.isArray(block.data.head) ||
      !block.data.head.every((head) => isString(head.content))
    ) {
      errors.push({
        path: "data.head",
        message: "Table head must be an array of objects with a content string",
      });
    }

    if (
      !Array.isArray(block.data.body) ||
      !block.data.body.every((body) => isString(body.content))
    ) {
      errors.push({
        path: "data.body",
        message: "Table body must be an array of objects with a content string",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

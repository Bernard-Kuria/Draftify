import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateListBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "list") {
    errors.push({ path: "type", message: "Expected block type 'list'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "List requires a data object" });
  } else {
    if (
      block.data.listStyle !== "ordered" &&
      block.data.listStyle !== "unordered"
    ) {
      errors.push({
        path: "data.listStyle",
        message: "List style must be 'ordered' or 'unordered'",
      });
    }

    if (!Array.isArray(block.data.items) || !block.data.items.every(isString)) {
      errors.push({
        path: "data.items",
        message: "List items must be an array of strings",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

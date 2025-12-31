import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateSubheadingBlock(
  block: DraftifyBlock
): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "subheading") {
    errors.push({
      path: "type",
      message: "Expected block type 'subheading'",
    });
  } else if (!isObject(block.data)) {
    errors.push({
      path: "data",
      message: "Subheading requires a data object",
    });
  } else {
    if (!isString(block.data.text)) {
      errors.push({
        path: "data.text",
        message: "Subheading text must be a string",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

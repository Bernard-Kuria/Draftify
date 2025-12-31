import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateHeadingBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "heading") {
    errors.push({
      path: "type",
      message: "Expected block type 'heading'",
    });
  } else if (!isObject(block.data)) {
    errors.push({
      path: "data",
      message: "Heading requires a data object",
    });
  } else {
    if (!isString(block.data.text)) {
      errors.push({
        path: "data.text",
        message: "Heading text must be a string",
      });
    }

    if (
      typeof block.data.level !== "number" ||
      block.data.level < 1 ||
      block.data.level > 6
    ) {
      errors.push({
        path: "data.level",
        message: "Heading level must be a number between 1 and 6",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

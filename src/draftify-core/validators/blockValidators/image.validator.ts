import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateImageBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "image") {
    errors.push({ path: "type", message: "Expected block type 'image'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "Image requires a data object" });
  } else {
    if (!isString(block.data.src)) {
      errors.push({
        path: "data.src",
        message: "Image src must be a string",
      });
    }

    if (block.data.alt !== undefined && !isString(block.data.alt)) {
      errors.push({
        path: "data.alt",
        message: "Alt text must be a string if provided",
      });
    }

    if (block.data.caption !== undefined && !isString(block.data.caption)) {
      errors.push({
        path: "data.caption",
        message: "Caption must be a string if provided",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

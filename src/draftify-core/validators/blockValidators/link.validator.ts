import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateLinkBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "link") {
    errors.push({ path: "type", message: "Expected block type 'link'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "Link requires a data object" });
  } else {
    if (!isString(block.data.linkText)) {
      errors.push({
        path: "data.linkText",
        message: "Link text must be a string",
      });
    }

    if (!isString(block.data.url)) {
      errors.push({
        path: "data.url",
        message: "URL must be a string",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

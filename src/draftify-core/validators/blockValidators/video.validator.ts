import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

const PROVIDERS = ["youtube", "vimeo", "custom"];

export function validateVideoBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type !== "video") {
    errors.push({ path: "type", message: "Expected block type 'video'" });
  } else if (!isObject(block.data)) {
    errors.push({ path: "data", message: "Video requires a data object" });
  } else {
    if (!isString(block.data.src)) {
      errors.push({
        path: "data.src",
        message: "Video src must be a string",
      });
    }

    if (
      block.data.provider !== undefined &&
      !PROVIDERS.includes(block.data.provider)
    ) {
      errors.push({
        path: "data.provider",
        message: "Invalid video provider",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

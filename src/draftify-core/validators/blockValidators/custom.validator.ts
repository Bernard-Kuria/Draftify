import { ValidationResult } from "../types";
import { isObject, isString } from "../guards";
import { DraftifyBlock } from "../../schema/draftify.schema";

export function validateCustomBlock(block: DraftifyBlock): ValidationResult {
  const errors = [];

  if (!isObject(block)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Block must be an object" }],
    };
  }

  if (block.type.split("-")[0] !== "custom") {
    errors.push({ path: "type", message: "Expected block type 'custom-x'" });
  } else if (!isObject(block.data)) {
    errors.push({
      path: "data",
      message: "Custom block requires a data object",
    });
  } else {
    if (!isString(block.iconText) && block.iconText !== "") {
      errors.push({
        path: "iconText",
        message: "Custom block must have a iconText value",
      });
    }
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

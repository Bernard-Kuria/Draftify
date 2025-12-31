import { DraftifyDocument } from "../schema/draftify.schema";
import { isObject, isArray } from "./guards";
import { ValidationError, ValidationResult } from "./types";
import { validateBlock } from "./validateBlock";

export function validateDocument(doc: DraftifyDocument): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isObject(doc)) {
    return {
      valid: false,
      errors: [{ path: "", message: "Document must be an object" }],
    };
  }

  if (!doc.version) {
    errors.push({ path: "version", message: "Document must have a version" });
  }

  if (!isArray(doc.blocks)) {
    return {
      valid: false,
      errors: [{ path: "blocks", message: "blocks must be an array" }],
    };
  }

  doc.blocks.forEach((block, index) => {
    const result = validateBlock(block);
    if (!result.valid) {
      result.errors.forEach((err) =>
        errors.push({
          path: `blocks[${index}].${err.path}`,
          message: err.message,
        })
      );
    }
  });

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

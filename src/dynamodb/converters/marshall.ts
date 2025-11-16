/**
 * @file Convert JavaScript values to DynamoDB AttributeValue format
 */

import type { AttributeValue } from "../domains/record-item";

/**
 * Convert JavaScript value to DynamoDB AttributeValue format
 */
export function marshall(value: unknown): AttributeValue {
  if (value === null || value === undefined) {
    return { NULL: true };
  }

  if (typeof value === "boolean") {
    return { BOOL: value };
  }

  if (typeof value === "string") {
    return { S: value };
  }

  if (typeof value === "number") {
    return { N: String(value) };
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { L: [] };
    }

    // String Set if all elements are strings
    if (value.every((item) => typeof item === "string")) {
      return { SS: value as string[] };
    }

    // Number Set if all elements are numbers
    if (value.every((item) => typeof item === "number")) {
      return { NS: (value as number[]).map(String) };
    }

    // Otherwise List (L)
    return { L: value.map(marshall) };
  }

  if (typeof value === "object") {
    const map: Record<string, AttributeValue> = {};
    for (const [key, val] of Object.entries(value)) {
      map[key] = marshall(val);
    }
    return { M: map };
  }

  throw new Error(`Unsupported type: ${typeof value}`);
}

/**
 * Marshall all properties of an object
 */
export function marshallObject(
  obj: Record<string, unknown>,
): Record<string, AttributeValue> {
  const result: Record<string, AttributeValue> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = marshall(value);
  }
  return result;
}

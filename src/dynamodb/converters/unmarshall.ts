/**
 * @file Convert DynamoDB AttributeValue format to JavaScript values
 */

import type { AttributeValue } from "../domains/record-item";

/**
 * Convert DynamoDB AttributeValue format to JavaScript value
 */
export function unmarshall(attr: AttributeValue): unknown {
  if ("S" in attr) {
    return attr.S;
  }

  if ("N" in attr) {
    return Number(attr.N);
  }

  if ("BOOL" in attr) {
    return attr.BOOL;
  }

  if ("NULL" in attr) {
    return null;
  }

  if ("SS" in attr) {
    return attr.SS;
  }

  if ("NS" in attr) {
    return attr.NS.map(Number);
  }

  if ("BS" in attr) {
    return attr.BS;
  }

  if ("L" in attr) {
    return attr.L.map(unmarshall);
  }

  if ("M" in attr) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(attr.M)) {
      result[key] = unmarshall(value);
    }
    return result;
  }

  throw new Error(`Unknown AttributeValue type: ${JSON.stringify(attr)}`);
}

/**
 * Convert DynamoDB Item (Map) to JavaScript object
 */
export function unmarshallItem(
  item: Record<string, AttributeValue>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(item)) {
    result[key] = unmarshall(value);
  }
  return result;
}

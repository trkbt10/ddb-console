/**
 * @file DynamoDB Transaction Domain Types
 * Type definitions for transaction entities
 */

import type { AttributeValue } from "./record-item";

/**
 * Item response
 */
export type ItemResponse = {
  Item?: Record<string, AttributeValue>;
};

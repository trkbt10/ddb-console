/**
 * @file DynamoDB Record/Item Domain Types
 * Type definitions for record and item entities
 */

/**
 * DynamoDB AttributeValue - actual data format for persistence
 * Type definitions for each attribute value of items stored in DynamoDB
 */
export type AttributeValue =
  | { S: string } // String
  | { N: string } // Number (represented as string)
  | { B: string } // Binary (Base64-encoded string)
  | { SS: string[] } // String Set
  | { NS: string[] } // Number Set
  | { BS: string[] } // Binary Set
  | { M: Record<string, AttributeValue> } // Map
  | { L: AttributeValue[] } // List
  | { NULL: true } // Null
  | { BOOL: boolean }; // Boolean

/**
 * Return values specification (for single item operations)
 */
export type ReturnValues = "NONE" | "ALL_OLD" | "UPDATED_OLD" | "ALL_NEW" | "UPDATED_NEW";

/**
 * Return values specification (for Put/Delete operations)
 */
export type ReturnValuesOnConditionCheckFailure = "NONE" | "ALL_OLD";

/**
 * Return consumed capacity specification
 */
export type ReturnConsumedCapacity = "INDEXES" | "TOTAL" | "NONE";

/**
 * Return item collection metrics specification
 */
export type ReturnItemCollectionMetrics = "SIZE" | "NONE";

/**
 * Select clause options (for Query/Scan)
 */
export type Select = "ALL_ATTRIBUTES" | "ALL_PROJECTED_ATTRIBUTES" | "SPECIFIC_ATTRIBUTES" | "COUNT";

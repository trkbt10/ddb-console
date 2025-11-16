/**
 * @file TransactGetItems command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "TransactGetItems" as const;

export type TransactGetItem = {
  Get: {
    Key: Record<string, AttributeValue>;
    TableName: string;
    ProjectionExpression?: string;
    ExpressionAttributeNames?: Record<string, string>;
  };
};

export type TransactGetItemsInput = {
  TransactItems: TransactGetItem[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
};

export type ItemResponse = {
  Item?: Record<string, AttributeValue>;
};

export type TransactGetItemsOutput = {
  ConsumedCapacity?: unknown[];
  Responses?: ItemResponse[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  TransactGetItemsInput,
  TransactGetItemsOutput
>(COMMAND_NAME);

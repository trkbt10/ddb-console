/**
 * @file DeleteItem command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnItemCollectionMetrics } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DeleteItem" as const;

export type DeleteItemInput = {
  TableName: string;
  Key: Record<string, AttributeValue>;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValues?: "NONE" | "ALL_OLD";
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
};

export type DeleteItemOutput = {
  Attributes?: Record<string, AttributeValue>;
  ConsumedCapacity?: unknown;
  ItemCollectionMetrics?: unknown;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DeleteItemInput,
  DeleteItemOutput
>(COMMAND_NAME);

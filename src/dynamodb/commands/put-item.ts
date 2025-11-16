/**
 * @file PutItem command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnItemCollectionMetrics } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "PutItem" as const;

export type PutItemInput = {
  TableName: string;
  Item: Record<string, AttributeValue>;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValues?: "NONE" | "ALL_OLD";
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
};

export type PutItemOutput = {
  Attributes?: Record<string, AttributeValue>;
  ConsumedCapacity?: unknown;
  ItemCollectionMetrics?: unknown;
};

export default defineCommand<
  typeof COMMAND_NAME,
  PutItemInput,
  PutItemOutput
>(COMMAND_NAME);

/**
 * @file UpdateItem command type definitions
 */

import type { AttributeValue, ReturnValues, ReturnConsumedCapacity, ReturnItemCollectionMetrics } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateItem" as const;

export type UpdateItemInput = {
  TableName: string;
  Key: Record<string, AttributeValue>;
  UpdateExpression?: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValues?: ReturnValues;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
};

export type UpdateItemOutput = {
  Attributes?: Record<string, AttributeValue>;
  ConsumedCapacity?: unknown;
  ItemCollectionMetrics?: unknown;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateItemInput,
  UpdateItemOutput
>(COMMAND_NAME);

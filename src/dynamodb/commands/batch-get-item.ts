/**
 * @file BatchGetItem command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity } from "../context/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "BatchGetItem" as const;

export type KeysAndAttributes = {
  Keys: Array<Record<string, AttributeValue>>;
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  ExpressionAttributeNames?: Record<string, string>;
  ProjectionExpression?: string;
};

export type BatchGetItemInput = {
  RequestItems: Record<string, KeysAndAttributes>;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
};

export type BatchGetItemOutput = {
  Responses?: Record<string, Array<Record<string, AttributeValue>>>;
  UnprocessedKeys?: Record<string, KeysAndAttributes>;
  ConsumedCapacity?: unknown[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  BatchGetItemInput,
  BatchGetItemOutput
>(COMMAND_NAME);

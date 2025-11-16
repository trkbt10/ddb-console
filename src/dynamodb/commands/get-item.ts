/**
 * @file GetItem command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity } from "../context/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "GetItem" as const;

export type GetItemInput = {
  TableName: string;
  Key: Record<string, AttributeValue>;
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  ExpressionAttributeNames?: Record<string, string>;
  ProjectionExpression?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
};

export type GetItemOutput = {
  Item?: Record<string, AttributeValue>;
  ConsumedCapacity?: unknown;
};

export default defineCommand<
  typeof COMMAND_NAME,
  GetItemInput,
  GetItemOutput
>(COMMAND_NAME);

/**
 * @file BatchWriteItem command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnItemCollectionMetrics } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "BatchWriteItem" as const;

export type WriteRequest = {
  PutRequest?: {
    Item: Record<string, AttributeValue>;
  };
  DeleteRequest?: {
    Key: Record<string, AttributeValue>;
  };
};

export type BatchWriteItemInput = {
  RequestItems: Record<string, WriteRequest[]>;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
};

export type BatchWriteItemOutput = {
  UnprocessedItems?: Record<string, WriteRequest[]>;
  ItemCollectionMetrics?: Record<string, unknown[]>;
  ConsumedCapacity?: unknown[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  BatchWriteItemInput,
  BatchWriteItemOutput
>(COMMAND_NAME);

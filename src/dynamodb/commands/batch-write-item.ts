/**
 * @file BatchWriteItem command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnItemCollectionMetrics } from "../context/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "BatchWriteItem" as const;

export type PutRequest = {
  Item: Record<string, AttributeValue>;
};

export type DeleteRequest = {
  Key: Record<string, AttributeValue>;
};

export type WriteRequest = {
  PutRequest?: PutRequest;
  DeleteRequest?: DeleteRequest;
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

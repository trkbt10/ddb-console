/**
 * @file TransactWriteItems command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnItemCollectionMetrics, ReturnValuesOnConditionCheckFailure } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "TransactWriteItems" as const;

export type ConditionCheck = {
  Key: Record<string, AttributeValue>;
  TableName: string;
  ConditionExpression: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
};

export type Put = {
  Item: Record<string, AttributeValue>;
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
};

export type Delete = {
  Key: Record<string, AttributeValue>;
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
};

export type Update = {
  Key: Record<string, AttributeValue>;
  TableName: string;
  UpdateExpression: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
};

export type TransactWriteItem = {
  ConditionCheck?: ConditionCheck;
  Put?: Put;
  Delete?: Delete;
  Update?: Update;
};

export type TransactWriteItemsInput = {
  TransactItems: TransactWriteItem[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ClientRequestToken?: string;
};

export type TransactWriteItemsOutput = {
  ConsumedCapacity?: unknown[];
  ItemCollectionMetrics?: Record<string, unknown[]>;
};

export default defineCommand<
  typeof COMMAND_NAME,
  TransactWriteItemsInput,
  TransactWriteItemsOutput
>(COMMAND_NAME);

/**
 * @file BatchExecuteStatement command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "BatchExecuteStatement" as const;

export type BatchStatementRequest = {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  ReturnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
};

export type BatchStatementResponse = {
  Item?: Record<string, AttributeValue>;
  TableName?: string;
  Error?: {
    Code?: string;
    Message?: string;
    Item?: Record<string, AttributeValue>;
  };
};

export type BatchExecuteStatementInput = {
  Statements: BatchStatementRequest[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
};

export type BatchExecuteStatementOutput = {
  Responses?: BatchStatementResponse[];
  ConsumedCapacity?: unknown[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  BatchExecuteStatementInput,
  BatchExecuteStatementOutput
>(COMMAND_NAME);

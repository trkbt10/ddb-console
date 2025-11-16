/**
 * @file BatchExecuteStatement command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnValuesOnConditionCheckFailure } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "BatchExecuteStatement" as const;

/**
 * Batch statement error
 */
export type BatchStatementError = {
  Code?: string;
  Message?: string;
  Item?: Record<string, AttributeValue>;
};

/**
 * Batch statement request
 */
export type BatchStatementRequest = {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
};

/**
 * Batch statement response
 */
export type BatchStatementResponse = {
  Error?: BatchStatementError;
  TableName?: string;
  Item?: Record<string, AttributeValue>;
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

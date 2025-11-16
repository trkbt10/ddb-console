/**
 * @file ExecuteStatement command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity } from "../context/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ExecuteStatement" as const;

export type ExecuteStatementInput = {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  Limit?: number;
  ReturnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
};

export type ExecuteStatementOutput = {
  Items?: Record<string, AttributeValue>[];
  NextToken?: string;
  ConsumedCapacity?: unknown;
  LastEvaluatedKey?: Record<string, AttributeValue>;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ExecuteStatementInput,
  ExecuteStatementOutput
>(COMMAND_NAME);

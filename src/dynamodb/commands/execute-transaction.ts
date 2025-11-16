/**
 * @file ExecuteTransaction command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ExecuteTransaction" as const;

export type ParameterizedStatement = {
  Statement: string;
  Parameters?: AttributeValue[];
  ReturnValuesOnConditionCheckFailure?: "ALL_OLD" | "NONE";
};

export type ItemResponse = {
  Item?: Record<string, AttributeValue>;
};

export type ExecuteTransactionInput = {
  TransactStatements: ParameterizedStatement[];
  ClientRequestToken?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
};

export type ExecuteTransactionOutput = {
  Responses?: ItemResponse[];
  ConsumedCapacity?: unknown[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  ExecuteTransactionInput,
  ExecuteTransactionOutput
>(COMMAND_NAME);

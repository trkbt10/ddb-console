/**
 * @file ExecuteTransaction command type definitions
 */

import type { AttributeValue, ReturnConsumedCapacity, ReturnValuesOnConditionCheckFailure } from "../domains/record-item";
import type { ItemResponse } from "../domains/transaction";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ExecuteTransaction" as const;

/**
 * Parameterized statement
 */
export type ParameterizedStatement = {
  Statement: string;
  Parameters?: AttributeValue[];
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
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

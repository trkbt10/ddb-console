/**
 * @file ListTables command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListTables" as const;

export type ListTablesInput = {
  ExclusiveStartTableName?: string;
  Limit?: number;
};

export type ListTablesOutput = {
  TableNames?: string[];
  LastEvaluatedTableName?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListTablesInput,
  ListTablesOutput
>(COMMAND_NAME);

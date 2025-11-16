/**
 * @file ListGlobalTables command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListGlobalTables" as const;

export type ListGlobalTablesInput = {
  ExclusiveStartGlobalTableName?: string;
  Limit?: number;
  RegionName?: string;
};

export type GlobalTable = {
  GlobalTableName?: string;
  ReplicationGroup?: Array<{
    RegionName?: string;
  }>;
};

export type ListGlobalTablesOutput = {
  GlobalTables?: GlobalTable[];
  LastEvaluatedGlobalTableName?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListGlobalTablesInput,
  ListGlobalTablesOutput
>(COMMAND_NAME);

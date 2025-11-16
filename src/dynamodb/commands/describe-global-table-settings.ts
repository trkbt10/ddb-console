/**
 * @file DescribeGlobalTableSettings command type definitions
 */

import type { ReplicaSettingsDescription } from "../domains/global-table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeGlobalTableSettings" as const;

export type DescribeGlobalTableSettingsInput = {
  GlobalTableName: string;
};

export type DescribeGlobalTableSettingsOutput = {
  GlobalTableName?: string;
  ReplicaSettings?: ReplicaSettingsDescription[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeGlobalTableSettingsInput,
  DescribeGlobalTableSettingsOutput
>(COMMAND_NAME);

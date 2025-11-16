/**
 * @file UpdateGlobalTableSettings command type definitions
 */

import type { BillingMode } from "../domains/table";
import type { ReplicaSettingsDescription } from "../domains/global-table";
import type { AutoScalingSettingsUpdate, GlobalSecondaryIndexAutoScalingUpdate } from "../domains/auto-scaling";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateGlobalTableSettings" as const;

/**
 * Replica settings update
 */
export type ReplicaSettingsUpdate = {
  RegionName: string;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  ReplicaGlobalSecondaryIndexSettingsUpdate?: Array<{
    IndexName: string;
    ProvisionedReadCapacityUnits?: number;
    ProvisionedReadCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  }>;
  ReplicaTableClass?: "STANDARD" | "STANDARD_INFREQUENT_ACCESS";
};

export type UpdateGlobalTableSettingsInput = {
  GlobalTableName: string;
  GlobalTableBillingMode?: BillingMode;
  GlobalTableProvisionedWriteCapacityUnits?: number;
  GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  GlobalTableGlobalSecondaryIndexSettingsUpdate?: GlobalSecondaryIndexAutoScalingUpdate[];
  ReplicaSettingsUpdate?: ReplicaSettingsUpdate[];
};

export type UpdateGlobalTableSettingsOutput = {
  GlobalTableName?: string;
  ReplicaSettings?: ReplicaSettingsDescription[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateGlobalTableSettingsInput,
  UpdateGlobalTableSettingsOutput
>(COMMAND_NAME);

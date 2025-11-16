/**
 * @file UpdateTableReplicaAutoScaling command type definitions
 */

import type {
  TableAutoScalingDescription,
  GlobalSecondaryIndexAutoScalingUpdate,
  AutoScalingSettingsUpdate,
} from "../context/auto-scaling";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateTableReplicaAutoScaling" as const;

/**
 * Replica auto-scaling update
 */
export type ReplicaAutoScalingUpdate = {
  RegionName: string;
  ReplicaGlobalSecondaryIndexUpdates?: Array<{
    IndexName?: string;
    ProvisionedReadCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
  }>;
  ReplicaProvisionedReadCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
};

export type UpdateTableReplicaAutoScalingInput = {
  GlobalSecondaryIndexUpdates?: GlobalSecondaryIndexAutoScalingUpdate[];
  TableName: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
  ReplicaUpdates?: ReplicaAutoScalingUpdate[];
};

export type UpdateTableReplicaAutoScalingOutput = {
  TableAutoScalingDescription?: TableAutoScalingDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateTableReplicaAutoScalingInput,
  UpdateTableReplicaAutoScalingOutput
>(COMMAND_NAME);

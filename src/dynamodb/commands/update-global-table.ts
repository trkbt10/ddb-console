/**
 * @file UpdateGlobalTable command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateGlobalTable" as const;

export type UpdateGlobalTableInput = {
  GlobalTableName: string;
  ReplicaUpdates: Array<{
    Create?: {
      RegionName: string;
    };
    Delete?: {
      RegionName: string;
    };
  }>;
};

export type GlobalTableDescription = {
  ReplicationGroup?: Array<{
    RegionName?: string;
    ReplicaStatus?: "CREATING" | "CREATION_FAILED" | "UPDATING" | "DELETING" | "ACTIVE";
    ReplicaStatusDescription?: string;
    ReplicaStatusPercentProgress?: string;
    KMSMasterKeyId?: string;
    ProvisionedThroughputOverride?: {
      ReadCapacityUnits?: number;
    };
    GlobalSecondaryIndexes?: Array<{
      IndexName?: string;
      ProvisionedThroughputOverride?: {
        ReadCapacityUnits?: number;
      };
    }>;
    ReplicaInaccessibleDateTime?: number;
  }>;
  GlobalTableArn?: string;
  CreationDateTime?: number;
  GlobalTableStatus?: "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";
  GlobalTableName?: string;
};

export type UpdateGlobalTableOutput = {
  GlobalTableDescription?: GlobalTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateGlobalTableInput,
  UpdateGlobalTableOutput
>(COMMAND_NAME);

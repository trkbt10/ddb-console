/**
 * @file CreateGlobalTable command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "CreateGlobalTable" as const;

export type CreateGlobalTableInput = {
  GlobalTableName: string;
  ReplicationGroup: Array<{
    RegionName: string;
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

export type CreateGlobalTableOutput = {
  GlobalTableDescription?: GlobalTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  CreateGlobalTableInput,
  CreateGlobalTableOutput
>(COMMAND_NAME);

/**
 * @file DescribeGlobalTable command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeGlobalTable" as const;

export type DescribeGlobalTableInput = {
  GlobalTableName: string;
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

export type DescribeGlobalTableOutput = {
  GlobalTableDescription?: GlobalTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeGlobalTableInput,
  DescribeGlobalTableOutput
>(COMMAND_NAME);

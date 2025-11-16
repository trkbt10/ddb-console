/**
 * @file DynamoDB Global Table Domain Types
 * Type definitions for global table entities
 */

import type {
  BillingMode,
  IndexStatus,
  ReplicaStatus,
  TableClassSummary,
} from "./table";
import type { AutoScalingSettingsDescription } from "./auto-scaling";

/**
 * Global table status
 */
export type GlobalTableStatus = "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";

/**
 * Replica billing mode summary
 */
export type ReplicaBillingModeSummary = {
  BillingMode?: BillingMode;
  LastUpdateToPayPerRequestDateTime?: number;
};

/**
 * Replica global secondary index settings description
 */
export type ReplicaGlobalSecondaryIndexSettingsDescription = {
  IndexName: string;
  IndexStatus?: IndexStatus;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ProvisionedWriteCapacityUnits?: number;
  ProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
};

/**
 * Replica settings description
 */
export type ReplicaSettingsDescription = {
  RegionName: string;
  ReplicaStatus?: ReplicaStatus;
  ReplicaBillingModeSummary?: ReplicaBillingModeSummary;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityUnits?: number;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaGlobalSecondaryIndexSettings?: ReplicaGlobalSecondaryIndexSettingsDescription[];
  ReplicaTableClassSummary?: TableClassSummary;
};

/**
 * Replica description (for legacy GlobalTable)
 */
export type LegacyReplicaDescription = {
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
};

/**
 * Global table description (legacy version)
 */
export type GlobalTableDescription = {
  ReplicationGroup?: LegacyReplicaDescription[];
  GlobalTableArn?: string;
  CreationDateTime?: number;
  GlobalTableStatus?: GlobalTableStatus;
  GlobalTableName?: string;
};

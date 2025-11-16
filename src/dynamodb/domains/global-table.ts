/**
 * @file DynamoDB Global Table Domain Types
 * Type definitions for global table entities
 */

/**
 * Global table status
 */
export type GlobalTableStatus = "CREATING" | "ACTIVE" | "DELETING" | "UPDATING";

/**
 * Replica billing mode summary
 */
export type ReplicaBillingModeSummary = {
  BillingMode?: import("./table").BillingMode;
  LastUpdateToPayPerRequestDateTime?: number;
};

/**
 * Replica global secondary index settings description
 */
export type ReplicaGlobalSecondaryIndexSettingsDescription = {
  IndexName: string;
  IndexStatus?: import("./table").IndexStatus;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedReadCapacityAutoScalingSettings?: import("./auto-scaling").AutoScalingSettingsDescription;
  ProvisionedWriteCapacityUnits?: number;
  ProvisionedWriteCapacityAutoScalingSettings?: import("./auto-scaling").AutoScalingSettingsDescription;
};

/**
 * Replica settings description
 */
export type ReplicaSettingsDescription = {
  RegionName: string;
  ReplicaStatus?: import("./table").ReplicaStatus;
  ReplicaBillingModeSummary?: ReplicaBillingModeSummary;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettings?: import("./auto-scaling").AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityUnits?: number;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: import("./auto-scaling").AutoScalingSettingsDescription;
  ReplicaGlobalSecondaryIndexSettings?: ReplicaGlobalSecondaryIndexSettingsDescription[];
  ReplicaTableClassSummary?: import("./table").TableClassSummary;
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

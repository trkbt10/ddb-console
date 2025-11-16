/**
 * @file DynamoDB Auto-Scaling Domain Types
 * Type definitions for auto-scaling entities
 */

/**
 * Target tracking scaling policy configuration
 */
export type TargetTrackingScalingPolicyConfiguration = {
  DisableScaleIn?: boolean;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  TargetValue: number;
};

/**
 * Auto-scaling policy
 */
export type AutoScalingPolicyDescription = {
  PolicyName?: string;
  TargetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
};

/**
 * Auto-scaling settings description
 */
export type AutoScalingSettingsDescription = {
  MinimumUnits?: number;
  MaximumUnits?: number;
  AutoScalingDisabled?: boolean;
  AutoScalingRoleArn?: string;
  ScalingPolicies?: AutoScalingPolicyDescription[];
};

/**
 * Auto-scaling settings update
 */
export type AutoScalingSettingsUpdate = {
  MinimumUnits?: number;
  MaximumUnits?: number;
  AutoScalingDisabled?: boolean;
  AutoScalingRoleArn?: string;
  ScalingPolicyUpdate?: {
    PolicyName?: string;
    TargetTrackingScalingPolicyConfiguration: TargetTrackingScalingPolicyConfiguration;
  };
};

/**
 * Replica global secondary index auto-scaling description
 */
export type ReplicaGlobalSecondaryIndexAutoScalingDescription = {
  IndexName?: string;
  IndexStatus?: import("./table").IndexStatus;
  ProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
};

/**
 * Global secondary index auto-scaling update
 */
export type GlobalSecondaryIndexAutoScalingUpdate = {
  IndexName?: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
};

/**
 * Replica auto-scaling description
 */
export type ReplicaAutoScalingDescription = {
  RegionName?: string;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndexAutoScalingDescription[];
  ReplicaProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaStatus?: import("./table").ReplicaStatus;
};

/**
 * Table auto-scaling description
 */
export type TableAutoScalingDescription = {
  TableName?: string;
  TableStatus?: import("./table").TableStatus;
  Replicas?: ReplicaAutoScalingDescription[];
};

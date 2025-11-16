/**
 * @file DescribeTableReplicaAutoScaling command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeTableReplicaAutoScaling" as const;

export type DescribeTableReplicaAutoScalingInput = {
  TableName: string;
};

export type TableAutoScalingDescription = {
  TableName?: string;
  TableStatus?: "CREATING" | "UPDATING" | "DELETING" | "ACTIVE" | "INACCESSIBLE_ENCRYPTION_CREDENTIALS" | "ARCHIVING" | "ARCHIVED";
  Replicas?: Array<{
    RegionName?: string;
    GlobalSecondaryIndexes?: Array<{
      IndexName?: string;
      IndexStatus?: "CREATING" | "UPDATING" | "DELETING" | "ACTIVE";
      ProvisionedReadCapacityAutoScalingSettings?: {
        MinimumUnits?: number;
        MaximumUnits?: number;
        AutoScalingDisabled?: boolean;
        AutoScalingRoleArn?: string;
        ScalingPolicies?: Array<{
          PolicyName?: string;
          TargetTrackingScalingPolicyConfiguration?: {
            DisableScaleIn?: boolean;
            ScaleInCooldown?: number;
            ScaleOutCooldown?: number;
            TargetValue: number;
          };
        }>;
      };
      ProvisionedWriteCapacityAutoScalingSettings?: {
        MinimumUnits?: number;
        MaximumUnits?: number;
        AutoScalingDisabled?: boolean;
        AutoScalingRoleArn?: string;
        ScalingPolicies?: Array<{
          PolicyName?: string;
          TargetTrackingScalingPolicyConfiguration?: {
            DisableScaleIn?: boolean;
            ScaleInCooldown?: number;
            ScaleOutCooldown?: number;
            TargetValue: number;
          };
        }>;
      };
    }>;
    ReplicaProvisionedReadCapacityAutoScalingSettings?: {
      MinimumUnits?: number;
      MaximumUnits?: number;
      AutoScalingDisabled?: boolean;
      AutoScalingRoleArn?: string;
      ScalingPolicies?: Array<{
        PolicyName?: string;
        TargetTrackingScalingPolicyConfiguration?: {
          DisableScaleIn?: boolean;
          ScaleInCooldown?: number;
          ScaleOutCooldown?: number;
          TargetValue: number;
        };
      }>;
    };
    ReplicaProvisionedWriteCapacityAutoScalingSettings?: {
      MinimumUnits?: number;
      MaximumUnits?: number;
      AutoScalingDisabled?: boolean;
      AutoScalingRoleArn?: string;
      ScalingPolicies?: Array<{
        PolicyName?: string;
        TargetTrackingScalingPolicyConfiguration?: {
          DisableScaleIn?: boolean;
          ScaleInCooldown?: number;
          ScaleOutCooldown?: number;
          TargetValue: number;
        };
      }>;
    };
    ReplicaStatus?: "CREATING" | "CREATION_FAILED" | "UPDATING" | "DELETING" | "ACTIVE" | "REGION_DISABLED" | "INACCESSIBLE_ENCRYPTION_CREDENTIALS";
  }>;
};

export type DescribeTableReplicaAutoScalingOutput = {
  TableAutoScalingDescription?: TableAutoScalingDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeTableReplicaAutoScalingInput,
  DescribeTableReplicaAutoScalingOutput
>(COMMAND_NAME);

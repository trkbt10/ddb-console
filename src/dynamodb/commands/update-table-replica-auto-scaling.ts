/**
 * @file UpdateTableReplicaAutoScaling command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateTableReplicaAutoScaling" as const;

export type UpdateTableReplicaAutoScalingInput = {
  GlobalSecondaryIndexUpdates?: Array<{
    IndexName: string;
    ProvisionedWriteCapacityAutoScalingUpdate?: {
      MinimumUnits?: number;
      MaximumUnits?: number;
      AutoScalingDisabled?: boolean;
      AutoScalingRoleArn?: string;
      ScalingPolicyUpdate?: {
        PolicyName?: string;
        TargetTrackingScalingPolicyConfiguration: {
          DisableScaleIn?: boolean;
          ScaleInCooldown?: number;
          ScaleOutCooldown?: number;
          TargetValue: number;
        };
      };
    };
  }>;
  TableName: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: {
    MinimumUnits?: number;
    MaximumUnits?: number;
    AutoScalingDisabled?: boolean;
    AutoScalingRoleArn?: string;
    ScalingPolicyUpdate?: {
      PolicyName?: string;
      TargetTrackingScalingPolicyConfiguration: {
        DisableScaleIn?: boolean;
        ScaleInCooldown?: number;
        ScaleOutCooldown?: number;
        TargetValue: number;
      };
    };
  };
  ReplicaUpdates?: Array<{
    RegionName: string;
    ReplicaGlobalSecondaryIndexUpdates?: Array<{
      IndexName: string;
      ProvisionedReadCapacityAutoScalingUpdate?: {
        MinimumUnits?: number;
        MaximumUnits?: number;
        AutoScalingDisabled?: boolean;
        AutoScalingRoleArn?: string;
        ScalingPolicyUpdate?: {
          PolicyName?: string;
          TargetTrackingScalingPolicyConfiguration: {
            DisableScaleIn?: boolean;
            ScaleInCooldown?: number;
            ScaleOutCooldown?: number;
            TargetValue: number;
          };
        };
      };
    }>;
    ReplicaProvisionedReadCapacityAutoScalingUpdate?: {
      MinimumUnits?: number;
      MaximumUnits?: number;
      AutoScalingDisabled?: boolean;
      AutoScalingRoleArn?: string;
      ScalingPolicyUpdate?: {
        PolicyName?: string;
        TargetTrackingScalingPolicyConfiguration: {
          DisableScaleIn?: boolean;
          ScaleInCooldown?: number;
          ScaleOutCooldown?: number;
          TargetValue: number;
        };
      };
    };
  }>;
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

export type UpdateTableReplicaAutoScalingOutput = {
  TableAutoScalingDescription?: TableAutoScalingDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateTableReplicaAutoScalingInput,
  UpdateTableReplicaAutoScalingOutput
>(COMMAND_NAME);

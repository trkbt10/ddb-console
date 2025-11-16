/**
 * @file UpdateGlobalTableSettings command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateGlobalTableSettings" as const;

export type UpdateGlobalTableSettingsInput = {
  GlobalTableName: string;
  GlobalTableBillingMode?: "PROVISIONED" | "PAY_PER_REQUEST";
  GlobalTableProvisionedWriteCapacityUnits?: number;
  GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate?: {
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
  GlobalTableGlobalSecondaryIndexSettingsUpdate?: Array<{
    IndexName: string;
    ProvisionedWriteCapacityUnits?: number;
    ProvisionedWriteCapacityAutoScalingSettingsUpdate?: {
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
  ReplicaSettingsUpdate?: Array<{
    RegionName: string;
    ReplicaProvisionedReadCapacityUnits?: number;
    ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate?: {
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
    ReplicaGlobalSecondaryIndexSettingsUpdate?: Array<{
      IndexName: string;
      ProvisionedReadCapacityUnits?: number;
      ProvisionedReadCapacityAutoScalingSettingsUpdate?: {
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
    ReplicaTableClass?: "STANDARD" | "STANDARD_INFREQUENT_ACCESS";
  }>;
};

export type UpdateGlobalTableSettingsOutput = {
  GlobalTableName?: string;
  ReplicaSettings?: Array<{
    RegionName: string;
    ReplicaStatus?: "CREATING" | "CREATION_FAILED" | "UPDATING" | "DELETING" | "ACTIVE" | "REGION_DISABLED" | "INACCESSIBLE_ENCRYPTION_CREDENTIALS";
    ReplicaBillingModeSummary?: {
      BillingMode?: "PROVISIONED" | "PAY_PER_REQUEST";
      LastUpdateToPayPerRequestDateTime?: number;
    };
    ReplicaProvisionedReadCapacityUnits?: number;
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
    ReplicaProvisionedWriteCapacityUnits?: number;
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
    ReplicaGlobalSecondaryIndexSettings?: Array<{
      IndexName: string;
      IndexStatus?: "CREATING" | "UPDATING" | "DELETING" | "ACTIVE";
      ProvisionedReadCapacityUnits?: number;
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
      ProvisionedWriteCapacityUnits?: number;
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
    ReplicaTableClassSummary?: {
      TableClass?: "STANDARD" | "STANDARD_INFREQUENT_ACCESS";
      LastUpdateDateTime?: number;
    };
  }>;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateGlobalTableSettingsInput,
  UpdateGlobalTableSettingsOutput
>(COMMAND_NAME);

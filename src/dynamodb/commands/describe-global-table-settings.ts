/**
 * @file DescribeGlobalTableSettings command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeGlobalTableSettings" as const;

export type DescribeGlobalTableSettingsInput = {
  GlobalTableName: string;
};

export type DescribeGlobalTableSettingsOutput = {
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
  DescribeGlobalTableSettingsInput,
  DescribeGlobalTableSettingsOutput
>(COMMAND_NAME);

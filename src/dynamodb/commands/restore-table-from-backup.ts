/**
 * @file RestoreTableFromBackup command type definitions
 */

import type { TableDescription } from "../domains/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "RestoreTableFromBackup" as const;

export type RestoreTableFromBackupInput = {
  TargetTableName: string;
  BackupArn: string;
  BillingModeOverride?: "PROVISIONED" | "PAY_PER_REQUEST";
  GlobalSecondaryIndexOverride?: Array<{
    IndexName: string;
    KeySchema: Array<{
      AttributeName: string;
      KeyType: "HASH" | "RANGE";
    }>;
    Projection: {
      ProjectionType?: "ALL" | "KEYS_ONLY" | "INCLUDE";
      NonKeyAttributes?: string[];
    };
    ProvisionedThroughput?: {
      ReadCapacityUnits: number;
      WriteCapacityUnits: number;
    };
    OnDemandThroughput?: {
      MaxReadRequestUnits?: number;
      MaxWriteRequestUnits?: number;
    };
  }>;
  LocalSecondaryIndexOverride?: Array<{
    IndexName: string;
    KeySchema: Array<{
      AttributeName: string;
      KeyType: "HASH" | "RANGE";
    }>;
    Projection: {
      ProjectionType?: "ALL" | "KEYS_ONLY" | "INCLUDE";
      NonKeyAttributes?: string[];
    };
  }>;
  ProvisionedThroughputOverride?: {
    ReadCapacityUnits: number;
    WriteCapacityUnits: number;
  };
  OnDemandThroughputOverride?: {
    MaxReadRequestUnits?: number;
    MaxWriteRequestUnits?: number;
  };
  SSESpecificationOverride?: {
    Enabled?: boolean;
    SSEType?: "AES256" | "KMS";
    KMSMasterKeyId?: string;
  };
};

export type RestoreTableFromBackupOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  RestoreTableFromBackupInput,
  RestoreTableFromBackupOutput
>(COMMAND_NAME);

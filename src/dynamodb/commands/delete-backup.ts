/**
 * @file DeleteBackup command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DeleteBackup" as const;

export type DeleteBackupInput = {
  BackupArn: string;
};

export type BackupDescription = {
  BackupDetails?: {
    BackupArn: string;
    BackupName: string;
    BackupSizeBytes?: number;
    BackupStatus: "CREATING" | "DELETED" | "AVAILABLE";
    BackupType: "USER" | "SYSTEM" | "AWS_BACKUP";
    BackupCreationDateTime: number;
    BackupExpiryDateTime?: number;
  };
  SourceTableDetails?: {
    TableName: string;
    TableId: string;
    TableArn?: string;
    TableSizeBytes?: number;
    KeySchema: Array<{
      AttributeName: string;
      KeyType: "HASH" | "RANGE";
    }>;
    TableCreationDateTime: number;
    ProvisionedThroughput?: {
      ReadCapacityUnits: number;
      WriteCapacityUnits: number;
    };
    OnDemandThroughput?: {
      MaxReadRequestUnits?: number;
      MaxWriteRequestUnits?: number;
    };
    ItemCount?: number;
    BillingMode?: "PROVISIONED" | "PAY_PER_REQUEST";
  };
  SourceTableFeatureDetails?: {
    LocalSecondaryIndexes?: Array<{
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
    GlobalSecondaryIndexes?: Array<{
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
    StreamDescription?: {
      StreamEnabled: boolean;
      StreamViewType?: "NEW_IMAGE" | "OLD_IMAGE" | "NEW_AND_OLD_IMAGES" | "KEYS_ONLY";
    };
    TimeToLiveDescription?: {
      TimeToLiveStatus: "ENABLING" | "DISABLING" | "ENABLED" | "DISABLED";
      AttributeName?: string;
    };
    SSEDescription?: {
      Status?: "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | "UPDATING";
      SSEType?: "AES256" | "KMS";
      KMSMasterKeyArn?: string;
    };
  };
};

export type DeleteBackupOutput = {
  BackupDescription?: BackupDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DeleteBackupInput,
  DeleteBackupOutput
>(COMMAND_NAME);

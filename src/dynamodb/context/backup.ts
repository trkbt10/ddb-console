/**
 * @file DynamoDB Backup Domain Types
 * Type definitions for backup and restore entities
 */

import type {
  KeySchemaElement,
  ProvisionedThroughput,
  OnDemandThroughput,
  BillingMode,
  Projection,
  StreamViewType,
  SSEStatus,
  SSEType,
} from "./table";

/**
 * Backup status
 */
export type BackupStatus = "CREATING" | "DELETED" | "AVAILABLE";

/**
 * Continuous backups status
 */
export type ContinuousBackupsStatus = "ENABLED" | "DISABLED";

/**
 * Point-in-time recovery status
 */
export type PointInTimeRecoveryStatus = "ENABLED" | "DISABLED";

/**
 * Source table details
 */
export type SourceTableDetails = {
  TableName: string;
  TableId: string;
  TableArn?: string;
  TableSizeBytes?: number;
  KeySchema: Array<KeySchemaElement>;
  TableCreationDateTime: number;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  ItemCount?: number;
  BillingMode?: BillingMode;
};

/**
 * Source table feature details
 */
export type SourceTableFeatureDetails = {
  LocalSecondaryIndexes?: Array<{
    IndexName: string;
    KeySchema: Array<KeySchemaElement>;
    Projection: Projection;
  }>;
  GlobalSecondaryIndexes?: Array<{
    IndexName: string;
    KeySchema: Array<KeySchemaElement>;
    Projection: Projection;
    ProvisionedThroughput?: ProvisionedThroughput;
    OnDemandThroughput?: OnDemandThroughput;
  }>;
  StreamDescription?: {
    StreamEnabled: boolean;
    StreamViewType?: StreamViewType;
  };
  TimeToLiveDescription?: {
    TimeToLiveStatus: "ENABLING" | "DISABLING" | "ENABLED" | "DISABLED";
    AttributeName?: string;
  };
  SSEDescription?: {
    Status?: SSEStatus;
    SSEType?: SSEType;
    KMSMasterKeyArn?: string;
  };
};

/**
 * Backup description
 */
export type BackupDescription = {
  BackupDetails?: {
    BackupArn: string;
    BackupName: string;
    BackupSizeBytes?: number;
    BackupStatus: BackupStatus;
    BackupType: "USER" | "SYSTEM" | "AWS_BACKUP";
    BackupCreationDateTime: number;
    BackupExpiryDateTime?: number;
  };
  SourceTableDetails?: SourceTableDetails;
  SourceTableFeatureDetails?: SourceTableFeatureDetails;
};

/**
 * Point-in-time recovery description
 */
export type PointInTimeRecoveryDescription = {
  PointInTimeRecoveryStatus?: PointInTimeRecoveryStatus;
  EarliestRestorableDateTime?: number;
  LatestRestorableDateTime?: number;
};

/**
 * Continuous backups description
 */
export type ContinuousBackupsDescription = {
  ContinuousBackupsStatus: ContinuousBackupsStatus;
  PointInTimeRecoveryDescription?: PointInTimeRecoveryDescription;
};

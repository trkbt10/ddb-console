/**
 * @file DynamoDB Backup Domain Types
 * Type definitions for backup and restore entities
 */

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
  KeySchema: Array<import("./table").KeySchemaElement>;
  TableCreationDateTime: number;
  ProvisionedThroughput?: import("./table").ProvisionedThroughput;
  OnDemandThroughput?: import("./table").OnDemandThroughput;
  ItemCount?: number;
  BillingMode?: import("./table").BillingMode;
};

/**
 * Source table feature details
 */
export type SourceTableFeatureDetails = {
  LocalSecondaryIndexes?: Array<{
    IndexName: string;
    KeySchema: Array<import("./table").KeySchemaElement>;
    Projection: import("./table").Projection;
  }>;
  GlobalSecondaryIndexes?: Array<{
    IndexName: string;
    KeySchema: Array<import("./table").KeySchemaElement>;
    Projection: import("./table").Projection;
    ProvisionedThroughput?: import("./table").ProvisionedThroughput;
    OnDemandThroughput?: import("./table").OnDemandThroughput;
  }>;
  StreamDescription?: {
    StreamEnabled: boolean;
    StreamViewType?: import("./table").StreamViewType;
  };
  TimeToLiveDescription?: {
    TimeToLiveStatus: "ENABLING" | "DISABLING" | "ENABLED" | "DISABLED";
    AttributeName?: string;
  };
  SSEDescription?: {
    Status?: import("./table").SSEStatus;
    SSEType?: import("./table").SSEType;
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

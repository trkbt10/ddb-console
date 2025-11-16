/**
 * @file DynamoDB Table Domain Types
 * Type definitions for table entities
 */

/**
 * Attribute type
 */
export type AttributeType = "S" | "N" | "B";

/**
 * Attribute definition
 */
export type AttributeDefinition = {
  AttributeName: string;
  AttributeType: AttributeType;
};

/**
 * Key type
 */
export type KeyType = "HASH" | "RANGE";

/**
 * Key schema element
 */
export type KeySchemaElement = {
  AttributeName: string;
  KeyType: KeyType;
};

/**
 * Projection type
 */
export type ProjectionType = "ALL" | "KEYS_ONLY" | "INCLUDE";

/**
 * Index projection
 */
export type Projection = {
  ProjectionType?: ProjectionType;
  NonKeyAttributes?: string[];
};

/**
 * Provisioned throughput
 */
export type ProvisionedThroughput = {
  ReadCapacityUnits: number;
  WriteCapacityUnits: number;
};

/**
 * On-demand throughput
 */
export type OnDemandThroughput = {
  MaxReadRequestUnits?: number;
  MaxWriteRequestUnits?: number;
};

/**
 * Local secondary index
 */
export type LocalSecondaryIndex = {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
};

/**
 * Global secondary index
 */
export type GlobalSecondaryIndex = {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
};

/**
 * Stream view type
 */
export type StreamViewType = "NEW_IMAGE" | "OLD_IMAGE" | "NEW_AND_OLD_IMAGES" | "KEYS_ONLY";

/**
 * Stream specification
 */
export type StreamSpecification = {
  StreamEnabled: boolean;
  StreamViewType?: StreamViewType;
};

/**
 * SSE (Server-Side Encryption) type
 */
export type SSEType = "AES256" | "KMS";

/**
 * SSE specification
 */
export type SSESpecification = {
  Enabled?: boolean;
  SSEType?: SSEType;
  KMSMasterKeyId?: string;
};

/**
 * Tag
 */
export type Tag = {
  Key: string;
  Value: string;
};

/**
 * Billing mode
 */
export type BillingMode = "PROVISIONED" | "PAY_PER_REQUEST";

/**
 * Table class
 */
export type TableClass = "STANDARD" | "STANDARD_INFREQUENT_ACCESS";

/**
 * Table status
 */
export type TableStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "INACCESSIBLE_ENCRYPTION_CREDENTIALS"
  | "ARCHIVING"
  | "ARCHIVED";

/**
 * Index status
 */
export type IndexStatus = "CREATING" | "UPDATING" | "DELETING" | "ACTIVE";

/**
 * Replica status
 */
export type ReplicaStatus =
  | "CREATING"
  | "CREATION_FAILED"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "REGION_DISABLED"
  | "INACCESSIBLE_ENCRYPTION_CREDENTIALS";

/**
 * SSE status
 */
export type SSEStatus = "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | "UPDATING";

/**
 * Global secondary index update operation
 */
export type GlobalSecondaryIndexUpdate = {
  Update?: {
    IndexName: string;
    ProvisionedThroughput: ProvisionedThroughput;
  };
  Create?: {
    IndexName: string;
    KeySchema: KeySchemaElement[];
    Projection: Projection;
    ProvisionedThroughput?: ProvisionedThroughput;
  };
  Delete?: {
    IndexName: string;
  };
};

/**
 * Replica update operation
 */
export type ReplicaUpdate = {
  Create?: {
    RegionName: string;
    KMSMasterKeyId?: string;
    ProvisionedThroughputOverride?: {
      ReadCapacityUnits?: number;
    };
    GlobalSecondaryIndexes?: Array<{
      IndexName: string;
      ProvisionedThroughputOverride?: {
        ReadCapacityUnits?: number;
      };
    }>;
    TableClassOverride?: TableClass;
  };
  Update?: {
    RegionName: string;
    KMSMasterKeyId?: string;
    ProvisionedThroughputOverride?: {
      ReadCapacityUnits?: number;
    };
    GlobalSecondaryIndexes?: Array<{
      IndexName: string;
      ProvisionedThroughputOverride?: {
        ReadCapacityUnits?: number;
      };
    }>;
    TableClassOverride?: TableClass;
  };
  Delete?: {
    RegionName: string;
  };
};

/**
 * Provisioned throughput description
 */
export type ProvisionedThroughputDescription = {
  LastIncreaseDateTime?: number;
  LastDecreaseDateTime?: number;
  NumberOfDecreasesToday?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
};

/**
 * Billing mode summary
 */
export type BillingModeSummary = {
  BillingMode?: BillingMode;
  LastUpdateToPayPerRequestDateTime?: number;
};

/**
 * Table class summary
 */
export type TableClassSummary = {
  TableClass?: TableClass;
  LastUpdateDateTime?: number;
};

/**
 * SSE (encryption) description
 */
export type SSEDescription = {
  Status?: SSEStatus;
  SSEType?: SSEType;
  KMSMasterKeyArn?: string;
  InaccessibleEncryptionDateTime?: number;
};

/**
 * Local secondary index description
 */
export type LocalSecondaryIndexDescription = {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
};

/**
 * Global secondary index description
 */
export type GlobalSecondaryIndexDescription = {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  IndexStatus?: IndexStatus;
  Backfilling?: boolean;
  ProvisionedThroughput?: ProvisionedThroughputDescription;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
};

/**
 * Replica description
 */
export type ReplicaDescription = {
  RegionName?: string;
  ReplicaStatus?: ReplicaStatus;
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
  ReplicaTableClassSummary?: TableClassSummary;
};

/**
 * Restore summary
 */
export type RestoreSummary = {
  SourceBackupArn?: string;
  SourceTableArn?: string;
  RestoreDateTime?: number;
  RestoreInProgress?: boolean;
};

/**
 * Archival summary
 */
export type ArchivalSummary = {
  ArchivalDateTime?: number;
  ArchivalReason?: string;
  ArchivalBackupArn?: string;
};

/**
 * Table description
 */
export type TableDescription = {
  AttributeDefinitions?: AttributeDefinition[];
  TableName?: string;
  KeySchema?: KeySchemaElement[];
  TableStatus?: TableStatus;
  CreationDateTime?: number;
  ProvisionedThroughput?: ProvisionedThroughputDescription;
  TableSizeBytes?: number;
  ItemCount?: number;
  TableArn?: string;
  TableId?: string;
  BillingModeSummary?: BillingModeSummary;
  LocalSecondaryIndexes?: LocalSecondaryIndexDescription[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndexDescription[];
  StreamSpecification?: StreamSpecification;
  LatestStreamLabel?: string;
  LatestStreamArn?: string;
  GlobalTableVersion?: string;
  Replicas?: ReplicaDescription[];
  RestoreSummary?: RestoreSummary;
  SSEDescription?: SSEDescription;
  ArchivalSummary?: ArchivalSummary;
  TableClassSummary?: TableClassSummary;
  DeletionProtectionEnabled?: boolean;
};

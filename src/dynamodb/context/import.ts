/**
 * @file DynamoDB Import Domain Types
 * Type definitions for import entities
 */

import type {
  AttributeDefinition,
  KeySchemaElement,
  BillingMode,
  ProvisionedThroughput,
  OnDemandThroughput,
  SSESpecification,
  Projection,
} from "./table";

/**
 * Import status
 */
export type ImportStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLING" | "CANCELLED" | "FAILED";

/**
 * Import table description
 */
export type ImportTableDescription = {
  ImportArn?: string;
  ImportStatus?: ImportStatus;
  TableArn?: string;
  TableId?: string;
  ClientToken?: string;
  S3BucketSource?: {
    S3BucketOwner?: string;
    S3Bucket: string;
    S3KeyPrefix?: string;
  };
  ErrorCount?: number;
  CloudWatchLogGroupArn?: string;
  InputFormat?: "DYNAMODB_JSON" | "ION" | "CSV";
  InputFormatOptions?: {
    Csv?: {
      Delimiter?: string;
      HeaderList?: string[];
    };
  };
  InputCompressionType?: "GZIP" | "ZSTD" | "NONE";
  TableCreationParameters?: {
    TableName: string;
    AttributeDefinitions: Array<AttributeDefinition>;
    KeySchema: Array<KeySchemaElement>;
    BillingMode?: BillingMode;
    ProvisionedThroughput?: ProvisionedThroughput;
    OnDemandThroughput?: OnDemandThroughput;
    SSESpecification?: SSESpecification;
    GlobalSecondaryIndexes?: Array<{
      IndexName: string;
      KeySchema: Array<KeySchemaElement>;
      Projection: Projection;
      ProvisionedThroughput?: ProvisionedThroughput;
      OnDemandThroughput?: OnDemandThroughput;
    }>;
  };
  StartTime?: number;
  EndTime?: number;
  ProcessedSizeBytes?: number;
  ProcessedItemCount?: number;
  ImportedItemCount?: number;
  FailureCode?: string;
  FailureMessage?: string;
};

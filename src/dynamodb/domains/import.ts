/**
 * @file DynamoDB Import Domain Types
 * Type definitions for import entities
 */

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
    AttributeDefinitions: Array<import("./table").AttributeDefinition>;
    KeySchema: Array<import("./table").KeySchemaElement>;
    BillingMode?: import("./table").BillingMode;
    ProvisionedThroughput?: import("./table").ProvisionedThroughput;
    OnDemandThroughput?: import("./table").OnDemandThroughput;
    SSESpecification?: import("./table").SSESpecification;
    GlobalSecondaryIndexes?: Array<{
      IndexName: string;
      KeySchema: Array<import("./table").KeySchemaElement>;
      Projection: import("./table").Projection;
      ProvisionedThroughput?: import("./table").ProvisionedThroughput;
      OnDemandThroughput?: import("./table").OnDemandThroughput;
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

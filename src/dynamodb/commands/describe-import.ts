/**
 * @file DescribeImport command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeImport" as const;

export type DescribeImportInput = {
  ImportArn: string;
};

export type ImportTableDescription = {
  ImportArn?: string;
  ImportStatus?: "IN_PROGRESS" | "COMPLETED" | "CANCELLING" | "CANCELLED" | "FAILED";
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
    AttributeDefinitions: Array<{
      AttributeName: string;
      AttributeType: "S" | "N" | "B";
    }>;
    KeySchema: Array<{
      AttributeName: string;
      KeyType: "HASH" | "RANGE";
    }>;
    BillingMode?: "PROVISIONED" | "PAY_PER_REQUEST";
    ProvisionedThroughput?: {
      ReadCapacityUnits: number;
      WriteCapacityUnits: number;
    };
    OnDemandThroughput?: {
      MaxReadRequestUnits?: number;
      MaxWriteRequestUnits?: number;
    };
    SSESpecification?: {
      Enabled?: boolean;
      SSEType?: "AES256" | "KMS";
      KMSMasterKeyId?: string;
    };
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
  };
  StartTime?: number;
  EndTime?: number;
  ProcessedSizeBytes?: number;
  ProcessedItemCount?: number;
  ImportedItemCount?: number;
  FailureCode?: string;
  FailureMessage?: string;
};

export type DescribeImportOutput = {
  ImportTableDescription?: ImportTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeImportInput,
  DescribeImportOutput
>(COMMAND_NAME);

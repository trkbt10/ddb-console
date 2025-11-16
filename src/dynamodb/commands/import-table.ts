/**
 * @file ImportTable command type definitions
 */

import type { ImportTableDescription } from "../context/import";
import type {
  AttributeDefinition,
  KeySchemaElement,
  BillingMode,
  ProvisionedThroughput,
  OnDemandThroughput,
  SSESpecification,
  Projection,
} from "../context/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ImportTable" as const;

/**
 * Input format
 */
export type InputFormat = "DYNAMODB_JSON" | "ION" | "CSV";

/**
 * Input compression type
 */
export type InputCompressionType = "GZIP" | "ZSTD" | "NONE";

/**
 * S3 bucket source
 */
export type S3BucketSource = {
  S3BucketOwner?: string;
  S3Bucket: string;
  S3KeyPrefix?: string;
};

/**
 * Input format options
 */
export type InputFormatOptions = {
  Csv?: {
    Delimiter?: string;
    HeaderList?: string[];
  };
};

export type ImportTableInput = {
  ClientToken?: string;
  S3BucketSource: S3BucketSource;
  InputFormat: InputFormat;
  InputFormatOptions?: InputFormatOptions;
  InputCompressionType?: InputCompressionType;
  TableCreationParameters: {
    TableName: string;
    AttributeDefinitions: AttributeDefinition[];
    KeySchema: KeySchemaElement[];
    BillingMode?: BillingMode;
    ProvisionedThroughput?: ProvisionedThroughput;
    OnDemandThroughput?: OnDemandThroughput;
    SSESpecification?: SSESpecification;
    GlobalSecondaryIndexes?: Array<{
      IndexName: string;
      KeySchema: KeySchemaElement[];
      Projection: Projection;
      ProvisionedThroughput?: ProvisionedThroughput;
      OnDemandThroughput?: OnDemandThroughput;
    }>;
  };
};

export type ImportTableOutput = {
  ImportTableDescription?: ImportTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ImportTableInput,
  ImportTableOutput
>(COMMAND_NAME);

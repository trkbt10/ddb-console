/**
 * @file DescribeExport command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeExport" as const;

export type DescribeExportInput = {
  ExportArn: string;
};

export type ExportDescription = {
  ExportArn?: string;
  ExportStatus?: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  StartTime?: number;
  EndTime?: number;
  ExportManifest?: string;
  TableArn?: string;
  TableId?: string;
  ExportTime?: number;
  ClientToken?: string;
  S3Bucket?: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: "AES256" | "KMS";
  S3SseKmsKeyId?: string;
  FailureCode?: string;
  FailureMessage?: string;
  ExportFormat?: "DYNAMODB_JSON" | "ION";
  BilledSizeBytes?: number;
  ItemCount?: number;
  ExportType?: "FULL_EXPORT" | "INCREMENTAL_EXPORT";
  IncrementalExportSpecification?: {
    ExportFromTime?: number;
    ExportToTime?: number;
    ExportViewType?: "NEW_IMAGE" | "NEW_AND_OLD_IMAGES";
  };
};

export type DescribeExportOutput = {
  ExportDescription?: ExportDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeExportInput,
  DescribeExportOutput
>(COMMAND_NAME);

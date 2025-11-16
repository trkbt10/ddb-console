/**
 * @file ExportTableToPointInTime command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ExportTableToPointInTime" as const;

export type ExportTableToPointInTimeInput = {
  TableArn: string;
  ExportTime?: number;
  ClientToken?: string;
  S3Bucket: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: "AES256" | "KMS";
  S3SseKmsKeyId?: string;
  ExportFormat?: "DYNAMODB_JSON" | "ION";
  ExportType?: "FULL_EXPORT" | "INCREMENTAL_EXPORT";
  IncrementalExportSpecification?: {
    ExportFromTime?: number;
    ExportToTime?: number;
    ExportViewType?: "NEW_IMAGE" | "NEW_AND_OLD_IMAGES";
  };
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

export type ExportTableToPointInTimeOutput = {
  ExportDescription?: ExportDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ExportTableToPointInTimeInput,
  ExportTableToPointInTimeOutput
>(COMMAND_NAME);

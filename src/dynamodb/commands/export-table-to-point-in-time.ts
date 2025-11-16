/**
 * @file ExportTableToPointInTime command type definitions
 */

import type { ExportDescription } from "../context/export";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ExportTableToPointInTime" as const;

/**
 * Export format
 */
export type ExportFormat = "DYNAMODB_JSON" | "ION";

/**
 * Export type
 */
export type ExportType = "FULL_EXPORT" | "INCREMENTAL_EXPORT";

/**
 * S3 SSE algorithm
 */
export type S3SseAlgorithm = "AES256" | "KMS";

/**
 * Incremental export specification
 */
export type IncrementalExportSpecification = {
  ExportFromTime?: number;
  ExportToTime?: number;
  ExportViewType?: "NEW_IMAGE" | "NEW_AND_OLD_IMAGES";
};

export type ExportTableToPointInTimeInput = {
  TableArn: string;
  ExportTime?: number;
  ClientToken?: string;
  S3Bucket: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: S3SseAlgorithm;
  S3SseKmsKeyId?: string;
  ExportFormat?: ExportFormat;
  ExportType?: ExportType;
  IncrementalExportSpecification?: IncrementalExportSpecification;
};

export type ExportTableToPointInTimeOutput = {
  ExportDescription?: ExportDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ExportTableToPointInTimeInput,
  ExportTableToPointInTimeOutput
>(COMMAND_NAME);

/**
 * @file DynamoDB Export Domain Types
 * Type definitions for export entities
 */

/**
 * Export status
 */
export type ExportStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED";

/**
 * Export format
 */
export type ExportFormat = "DYNAMODB_JSON" | "ION";

/**
 * Export type
 */
export type ExportType = "FULL_EXPORT" | "INCREMENTAL_EXPORT";

/**
 * Export view type
 */
export type ExportViewType = "NEW_IMAGE" | "NEW_AND_OLD_IMAGES";

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
  ExportViewType?: ExportViewType;
};

/**
 * Export description
 */
export type ExportDescription = {
  ExportArn?: string;
  ExportStatus?: ExportStatus;
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
  S3SseAlgorithm?: S3SseAlgorithm;
  S3SseKmsKeyId?: string;
  FailureCode?: string;
  FailureMessage?: string;
  ExportFormat?: ExportFormat;
  BilledSizeBytes?: number;
  ItemCount?: number;
  ExportType?: ExportType;
  IncrementalExportSpecification?: IncrementalExportSpecification;
};

/**
 * @file ListImports command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListImports" as const;

export type ListImportsInput = {
  TableArn?: string;
  PageSize?: number;
  NextToken?: string;
};

export type ImportSummary = {
  ImportArn?: string;
  ImportStatus?: "IN_PROGRESS" | "COMPLETED" | "CANCELLING" | "CANCELLED" | "FAILED";
  TableArn?: string;
  S3BucketSource?: {
    S3BucketOwner?: string;
    S3Bucket: string;
    S3KeyPrefix?: string;
  };
  CloudWatchLogGroupArn?: string;
  InputFormat?: "DYNAMODB_JSON" | "ION" | "CSV";
  StartTime?: number;
  EndTime?: number;
};

export type ListImportsOutput = {
  ImportSummaryList?: ImportSummary[];
  NextToken?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListImportsInput,
  ListImportsOutput
>(COMMAND_NAME);

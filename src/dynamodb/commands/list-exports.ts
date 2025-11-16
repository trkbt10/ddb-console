/**
 * @file ListExports command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListExports" as const;

/**
 * Export status
 */
export type ExportStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED";

/**
 * Export type
 */
export type ExportType = "FULL_EXPORT" | "INCREMENTAL_EXPORT";

/**
 * Export summary
 */
export type ExportSummary = {
  ExportArn?: string;
  ExportStatus?: ExportStatus;
  ExportType?: ExportType;
};

export type ListExportsInput = {
  TableArn?: string;
  MaxResults?: number;
  NextToken?: string;
};

export type ListExportsOutput = {
  ExportSummaries?: ExportSummary[];
  NextToken?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListExportsInput,
  ListExportsOutput
>(COMMAND_NAME);

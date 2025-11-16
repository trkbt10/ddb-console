/**
 * @file ListExports command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListExports" as const;

export type ListExportsInput = {
  TableArn?: string;
  MaxResults?: number;
  NextToken?: string;
};

export type ExportSummary = {
  ExportArn?: string;
  ExportStatus?: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  ExportType?: "FULL_EXPORT" | "INCREMENTAL_EXPORT";
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

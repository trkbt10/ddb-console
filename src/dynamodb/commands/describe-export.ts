/**
 * @file DescribeExport command type definitions
 */

import type { ExportDescription } from "../context/export";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeExport" as const;

export type DescribeExportInput = {
  ExportArn: string;
};

export type DescribeExportOutput = {
  ExportDescription?: ExportDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeExportInput,
  DescribeExportOutput
>(COMMAND_NAME);

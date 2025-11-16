/**
 * @file DescribeImport command type definitions
 */

import type { ImportTableDescription } from "../domains/import";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeImport" as const;

export type DescribeImportInput = {
  ImportArn: string;
};

export type DescribeImportOutput = {
  ImportTableDescription?: ImportTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeImportInput,
  DescribeImportOutput
>(COMMAND_NAME);

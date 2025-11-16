/**
 * @file DescribeGlobalTable command type definitions
 */

import type { GlobalTableDescription } from "../domains/global-table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeGlobalTable" as const;

export type DescribeGlobalTableInput = {
  GlobalTableName: string;
};

export type DescribeGlobalTableOutput = {
  GlobalTableDescription?: GlobalTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeGlobalTableInput,
  DescribeGlobalTableOutput
>(COMMAND_NAME);

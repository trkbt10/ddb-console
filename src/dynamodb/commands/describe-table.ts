/**
 * @file DescribeTable command type definitions
 */

import type { TableDescription } from "../context/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeTable" as const;

export type DescribeTableInput = {
  TableName: string;
};

export type DescribeTableOutput = {
  Table?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeTableInput,
  DescribeTableOutput
>(COMMAND_NAME);

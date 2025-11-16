/**
 * @file DeleteTable command type definitions
 */

import type { TableDescription } from "../domains/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DeleteTable" as const;

export type DeleteTableInput = {
  TableName: string;
};

export type DeleteTableOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DeleteTableInput,
  DeleteTableOutput
>(COMMAND_NAME);

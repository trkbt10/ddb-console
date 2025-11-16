/**
 * @file CreateGlobalTable command type definitions
 */

import type { GlobalTableDescription } from "../domains/global-table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "CreateGlobalTable" as const;

export type CreateGlobalTableInput = {
  GlobalTableName: string;
  ReplicationGroup: Array<{
    RegionName: string;
  }>;
};

export type CreateGlobalTableOutput = {
  GlobalTableDescription?: GlobalTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  CreateGlobalTableInput,
  CreateGlobalTableOutput
>(COMMAND_NAME);

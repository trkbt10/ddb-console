/**
 * @file UpdateGlobalTable command type definitions
 */

import type { GlobalTableDescription } from "../domains/global-table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateGlobalTable" as const;

export type UpdateGlobalTableInput = {
  GlobalTableName: string;
  ReplicaUpdates: Array<{
    Create?: {
      RegionName: string;
    };
    Delete?: {
      RegionName: string;
    };
  }>;
};

export type UpdateGlobalTableOutput = {
  GlobalTableDescription?: GlobalTableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateGlobalTableInput,
  UpdateGlobalTableOutput
>(COMMAND_NAME);

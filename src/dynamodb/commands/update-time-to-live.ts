/**
 * @file UpdateTimeToLive command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateTimeToLive" as const;

export type UpdateTimeToLiveInput = {
  TableName: string;
  TimeToLiveSpecification: {
    Enabled: boolean;
    AttributeName: string;
  };
};

export type TimeToLiveDescription = {
  TimeToLiveStatus?: "ENABLING" | "DISABLING" | "ENABLED" | "DISABLED";
  AttributeName?: string;
};

export type UpdateTimeToLiveOutput = {
  TimeToLiveSpecification?: TimeToLiveDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateTimeToLiveInput,
  UpdateTimeToLiveOutput
>(COMMAND_NAME);

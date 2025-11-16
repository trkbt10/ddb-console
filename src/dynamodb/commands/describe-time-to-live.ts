/**
 * @file DescribeTimeToLive command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeTimeToLive" as const;

export type DescribeTimeToLiveInput = {
  TableName: string;
};

export type TimeToLiveDescription = {
  TimeToLiveStatus?: "ENABLING" | "DISABLING" | "ENABLED" | "DISABLED";
  AttributeName?: string;
};

export type DescribeTimeToLiveOutput = {
  TimeToLiveDescription?: TimeToLiveDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeTimeToLiveInput,
  DescribeTimeToLiveOutput
>(COMMAND_NAME);

/**
 * @file DescribeTimeToLive command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeTimeToLive" as const;

/**
 * Time to live status
 */
export type TimeToLiveStatus = "ENABLING" | "DISABLING" | "ENABLED" | "DISABLED";

/**
 * Time to live description
 */
export type TimeToLiveDescription = {
  TimeToLiveStatus?: TimeToLiveStatus;
  AttributeName?: string;
};

export type DescribeTimeToLiveInput = {
  TableName: string;
};

export type DescribeTimeToLiveOutput = {
  TimeToLiveDescription?: TimeToLiveDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeTimeToLiveInput,
  DescribeTimeToLiveOutput
>(COMMAND_NAME);

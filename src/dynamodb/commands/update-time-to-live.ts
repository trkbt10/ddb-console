/**
 * @file UpdateTimeToLive command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateTimeToLive" as const;

/**
 * Time to live specification
 */
export type TimeToLiveSpecification = {
  Enabled: boolean;
  AttributeName: string;
};

export type UpdateTimeToLiveInput = {
  TableName: string;
  TimeToLiveSpecification: TimeToLiveSpecification;
};

export type UpdateTimeToLiveOutput = {
  TimeToLiveSpecification?: TimeToLiveSpecification;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateTimeToLiveInput,
  UpdateTimeToLiveOutput
>(COMMAND_NAME);

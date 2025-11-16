/**
 * @file DescribeLimits command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeLimits" as const;

export type DescribeLimitsInput = Record<string, never>;

export type DescribeLimitsOutput = {
  AccountMaxReadCapacityUnits?: number;
  AccountMaxWriteCapacityUnits?: number;
  TableMaxReadCapacityUnits?: number;
  TableMaxWriteCapacityUnits?: number;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeLimitsInput,
  DescribeLimitsOutput
>(COMMAND_NAME);

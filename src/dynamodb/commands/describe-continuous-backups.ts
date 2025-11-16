/**
 * @file DescribeContinuousBackups command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeContinuousBackups" as const;

export type DescribeContinuousBackupsInput = {
  TableName: string;
};

export type ContinuousBackupsDescription = {
  ContinuousBackupsStatus: "ENABLED" | "DISABLED";
  PointInTimeRecoveryDescription?: {
    PointInTimeRecoveryStatus?: "ENABLED" | "DISABLED";
    EarliestRestorableDateTime?: number;
    LatestRestorableDateTime?: number;
  };
};

export type DescribeContinuousBackupsOutput = {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeContinuousBackupsInput,
  DescribeContinuousBackupsOutput
>(COMMAND_NAME);

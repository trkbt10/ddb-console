/**
 * @file UpdateContinuousBackups command type definitions
 */

import type { ContinuousBackupsDescription } from "../context/backup";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateContinuousBackups" as const;

export type UpdateContinuousBackupsInput = {
  TableName: string;
  PointInTimeRecoverySpecification: {
    PointInTimeRecoveryEnabled: boolean;
  };
};

export type UpdateContinuousBackupsOutput = {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateContinuousBackupsInput,
  UpdateContinuousBackupsOutput
>(COMMAND_NAME);

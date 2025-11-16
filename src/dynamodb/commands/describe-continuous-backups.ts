/**
 * @file DescribeContinuousBackups command type definitions
 */

import type { ContinuousBackupsDescription } from "../domains/backup";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeContinuousBackups" as const;

export type DescribeContinuousBackupsInput = {
  TableName: string;
};

export type DescribeContinuousBackupsOutput = {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeContinuousBackupsInput,
  DescribeContinuousBackupsOutput
>(COMMAND_NAME);

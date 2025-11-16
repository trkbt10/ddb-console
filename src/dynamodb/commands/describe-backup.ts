/**
 * @file DescribeBackup command type definitions
 */

import type { BackupDescription } from "../domains/backup";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeBackup" as const;

export type DescribeBackupInput = {
  BackupArn: string;
};

export type DescribeBackupOutput = {
  BackupDescription?: BackupDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeBackupInput,
  DescribeBackupOutput
>(COMMAND_NAME);

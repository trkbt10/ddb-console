/**
 * @file DeleteBackup command type definitions
 */

import type { BackupDescription } from "../domains/backup";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DeleteBackup" as const;

export type DeleteBackupInput = {
  BackupArn: string;
};

export type DeleteBackupOutput = {
  BackupDescription?: BackupDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DeleteBackupInput,
  DeleteBackupOutput
>(COMMAND_NAME);

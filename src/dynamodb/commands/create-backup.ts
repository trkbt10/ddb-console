/**
 * @file CreateBackup command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "CreateBackup" as const;

export type CreateBackupInput = {
  TableName: string;
  BackupName: string;
};

export type BackupDetails = {
  BackupArn: string;
  BackupName: string;
  BackupSizeBytes?: number;
  BackupStatus: "CREATING" | "DELETED" | "AVAILABLE";
  BackupType: "USER" | "SYSTEM" | "AWS_BACKUP";
  BackupCreationDateTime: number;
  BackupExpiryDateTime?: number;
};

export type CreateBackupOutput = {
  BackupDetails?: BackupDetails;
};

export default defineCommand<
  typeof COMMAND_NAME,
  CreateBackupInput,
  CreateBackupOutput
>(COMMAND_NAME);

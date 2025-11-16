/**
 * @file CreateBackup command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "CreateBackup" as const;

/**
 * Backup status
 */
export type BackupStatus = "CREATING" | "DELETED" | "AVAILABLE";

/**
 * Backup type
 */
export type BackupType = "USER" | "SYSTEM" | "AWS_BACKUP";

/**
 * Backup details
 */
export type BackupDetails = {
  BackupArn: string;
  BackupName: string;
  BackupSizeBytes?: number;
  BackupStatus: BackupStatus;
  BackupType: BackupType;
  BackupCreationDateTime: number;
  BackupExpiryDateTime?: number;
};

export type CreateBackupInput = {
  TableName: string;
  BackupName: string;
};

export type CreateBackupOutput = {
  BackupDetails?: BackupDetails;
};

export default defineCommand<
  typeof COMMAND_NAME,
  CreateBackupInput,
  CreateBackupOutput
>(COMMAND_NAME);

/**
 * @file ListBackups command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListBackups" as const;

/**
 * Backup status
 */
export type BackupStatus = "CREATING" | "DELETED" | "AVAILABLE";

/**
 * Backup type
 */
export type BackupType = "USER" | "SYSTEM" | "AWS_BACKUP";

/**
 * Backup summary
 */
export type BackupSummary = {
  TableName?: string;
  TableId?: string;
  TableArn?: string;
  BackupArn?: string;
  BackupName?: string;
  BackupCreationDateTime?: number;
  BackupExpiryDateTime?: number;
  BackupStatus?: BackupStatus;
  BackupType?: BackupType;
  BackupSizeBytes?: number;
};

export type ListBackupsInput = {
  TableName?: string;
  Limit?: number;
  TimeRangeLowerBound?: number;
  TimeRangeUpperBound?: number;
  ExclusiveStartBackupArn?: string;
  BackupType?: BackupType | "ALL";
};

export type ListBackupsOutput = {
  BackupSummaries?: BackupSummary[];
  LastEvaluatedBackupArn?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListBackupsInput,
  ListBackupsOutput
>(COMMAND_NAME);

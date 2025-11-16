/**
 * @file ListBackups command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListBackups" as const;

export type ListBackupsInput = {
  TableName?: string;
  Limit?: number;
  TimeRangeLowerBound?: number;
  TimeRangeUpperBound?: number;
  ExclusiveStartBackupArn?: string;
  BackupType?: "USER" | "SYSTEM" | "AWS_BACKUP" | "ALL";
};

export type BackupSummary = {
  TableName?: string;
  TableId?: string;
  TableArn?: string;
  BackupArn?: string;
  BackupName?: string;
  BackupCreationDateTime?: number;
  BackupExpiryDateTime?: number;
  BackupStatus?: "CREATING" | "DELETED" | "AVAILABLE";
  BackupType?: "USER" | "SYSTEM" | "AWS_BACKUP";
  BackupSizeBytes?: number;
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

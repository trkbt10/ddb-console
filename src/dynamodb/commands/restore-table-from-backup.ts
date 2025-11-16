/**
 * @file RestoreTableFromBackup command type definitions
 */

import type {
  TableDescription,
  BillingMode,
  KeySchemaElement,
  Projection,
  ProvisionedThroughput,
  OnDemandThroughput,
  SSESpecification,
} from "../context/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "RestoreTableFromBackup" as const;

export type RestoreTableFromBackupInput = {
  TargetTableName: string;
  BackupArn: string;
  BillingModeOverride?: BillingMode;
  GlobalSecondaryIndexOverride?: Array<{
    IndexName: string;
    KeySchema: KeySchemaElement[];
    Projection: Projection;
    ProvisionedThroughput?: ProvisionedThroughput;
    OnDemandThroughput?: OnDemandThroughput;
  }>;
  LocalSecondaryIndexOverride?: Array<{
    IndexName: string;
    KeySchema: KeySchemaElement[];
    Projection: Projection;
  }>;
  ProvisionedThroughputOverride?: ProvisionedThroughput;
  OnDemandThroughputOverride?: OnDemandThroughput;
  SSESpecificationOverride?: SSESpecification;
};

export type RestoreTableFromBackupOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  RestoreTableFromBackupInput,
  RestoreTableFromBackupOutput
>(COMMAND_NAME);

/**
 * @file RestoreTableToPointInTime command type definitions
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

export const COMMAND_NAME = "RestoreTableToPointInTime" as const;

export type RestoreTableToPointInTimeInput = {
  SourceTableArn?: string;
  SourceTableName?: string;
  TargetTableName: string;
  UseLatestRestorableTime?: boolean;
  RestoreDateTime?: number;
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

export type RestoreTableToPointInTimeOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  RestoreTableToPointInTimeInput,
  RestoreTableToPointInTimeOutput
>(COMMAND_NAME);

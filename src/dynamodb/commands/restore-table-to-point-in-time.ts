/**
 * @file RestoreTableToPointInTime command type definitions
 */

import type { TableDescription } from "../domains/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "RestoreTableToPointInTime" as const;

export type RestoreTableToPointInTimeInput = {
  SourceTableArn?: string;
  SourceTableName?: string;
  TargetTableName: string;
  UseLatestRestorableTime?: boolean;
  RestoreDateTime?: number;
  BillingModeOverride?: "PROVISIONED" | "PAY_PER_REQUEST";
  GlobalSecondaryIndexOverride?: Array<{
    IndexName: string;
    KeySchema: Array<{
      AttributeName: string;
      KeyType: "HASH" | "RANGE";
    }>;
    Projection: {
      ProjectionType?: "ALL" | "KEYS_ONLY" | "INCLUDE";
      NonKeyAttributes?: string[];
    };
    ProvisionedThroughput?: {
      ReadCapacityUnits: number;
      WriteCapacityUnits: number;
    };
    OnDemandThroughput?: {
      MaxReadRequestUnits?: number;
      MaxWriteRequestUnits?: number;
    };
  }>;
  LocalSecondaryIndexOverride?: Array<{
    IndexName: string;
    KeySchema: Array<{
      AttributeName: string;
      KeyType: "HASH" | "RANGE";
    }>;
    Projection: {
      ProjectionType?: "ALL" | "KEYS_ONLY" | "INCLUDE";
      NonKeyAttributes?: string[];
    };
  }>;
  ProvisionedThroughputOverride?: {
    ReadCapacityUnits: number;
    WriteCapacityUnits: number;
  };
  OnDemandThroughputOverride?: {
    MaxReadRequestUnits?: number;
    MaxWriteRequestUnits?: number;
  };
  SSESpecificationOverride?: {
    Enabled?: boolean;
    SSEType?: "AES256" | "KMS";
    KMSMasterKeyId?: string;
  };
};

export type RestoreTableToPointInTimeOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  RestoreTableToPointInTimeInput,
  RestoreTableToPointInTimeOutput
>(COMMAND_NAME);

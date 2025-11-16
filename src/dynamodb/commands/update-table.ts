/**
 * @file UpdateTable command type definitions
 */

import type {
  ProvisionedThroughput,
  GlobalSecondaryIndexUpdate,
  AttributeDefinition,
  StreamSpecification,
  SSESpecification,
  ReplicaUpdate,
  BillingMode,
  TableClass,
  TableDescription,
} from "../domains/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateTable" as const;

export type UpdateTableInput = {
  TableName: string;
  AttributeDefinitions?: AttributeDefinition[];
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  GlobalSecondaryIndexUpdates?: GlobalSecondaryIndexUpdate[];
  StreamSpecification?: StreamSpecification;
  SSESpecification?: SSESpecification;
  ReplicaUpdates?: ReplicaUpdate[];
  TableClass?: TableClass;
  DeletionProtectionEnabled?: boolean;
};

export type UpdateTableOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateTableInput,
  UpdateTableOutput
>(COMMAND_NAME);

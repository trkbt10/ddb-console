/**
 * @file CreateTable command type definitions
 */

import type {
  AttributeDefinition,
  KeySchemaElement,
  ProvisionedThroughput,
  LocalSecondaryIndex,
  GlobalSecondaryIndex,
  StreamSpecification,
  SSESpecification,
  Tag,
  BillingMode,
  TableClass,
  TableDescription,
} from "../context/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "CreateTable" as const;

export type CreateTableInput = {
  TableName: string;
  AttributeDefinitions: AttributeDefinition[];
  KeySchema: KeySchemaElement[];
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  LocalSecondaryIndexes?: LocalSecondaryIndex[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndex[];
  StreamSpecification?: StreamSpecification;
  SSESpecification?: SSESpecification;
  Tags?: Tag[];
  TableClass?: TableClass;
  DeletionProtectionEnabled?: boolean;
};

export type CreateTableOutput = {
  TableDescription?: TableDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  CreateTableInput,
  CreateTableOutput
>(COMMAND_NAME);

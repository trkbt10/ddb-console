/**
 * @file DynamoDB client (dependency injection enabled)
 */

import type { SignedRequest } from "../crypto/signer";
import type { CommandDefinition, CommandInput, CommandOutput } from "./commands/types";
import { parseDynamoDBError } from "./errors";

// Import command definitions
import listTablesCommand from "./commands/list-tables";
import getItemCommand from "./commands/get-item";
import putItemCommand from "./commands/put-item";
import queryCommand from "./commands/query";
import scanCommand from "./commands/scan";
import updateItemCommand from "./commands/update-item";
import deleteItemCommand from "./commands/delete-item";
import batchGetItemCommand from "./commands/batch-get-item";
import batchWriteItemCommand from "./commands/batch-write-item";
import transactGetItemsCommand from "./commands/transact-get-items";
import transactWriteItemsCommand from "./commands/transact-write-items";
import describeTableCommand from "./commands/describe-table";
import createTableCommand from "./commands/create-table";
import updateTableCommand from "./commands/update-table";
import deleteTableCommand from "./commands/delete-table";
import executeStatementCommand from "./commands/execute-statement";
import batchExecuteStatementCommand from "./commands/batch-execute-statement";
import executeTransactionCommand from "./commands/execute-transaction";
import createBackupCommand from "./commands/create-backup";
import deleteBackupCommand from "./commands/delete-backup";
import describeBackupCommand from "./commands/describe-backup";
import describeContinuousBackupsCommand from "./commands/describe-continuous-backups";
import listBackupsCommand from "./commands/list-backups";
import restoreTableFromBackupCommand from "./commands/restore-table-from-backup";
import restoreTableToPointInTimeCommand from "./commands/restore-table-to-point-in-time";
import updateContinuousBackupsCommand from "./commands/update-continuous-backups";
import createGlobalTableCommand from "./commands/create-global-table";
import describeGlobalTableCommand from "./commands/describe-global-table";
import describeGlobalTableSettingsCommand from "./commands/describe-global-table-settings";
import listGlobalTablesCommand from "./commands/list-global-tables";
import updateGlobalTableCommand from "./commands/update-global-table";
import updateGlobalTableSettingsCommand from "./commands/update-global-table-settings";
import listTagsOfResourceCommand from "./commands/list-tags-of-resource";
import tagResourceCommand from "./commands/tag-resource";
import untagResourceCommand from "./commands/untag-resource";
import describeTimeToLiveCommand from "./commands/describe-time-to-live";
import updateTimeToLiveCommand from "./commands/update-time-to-live";
import describeExportCommand from "./commands/describe-export";
import describeImportCommand from "./commands/describe-import";
import exportTableToPointInTimeCommand from "./commands/export-table-to-point-in-time";
import importTableCommand from "./commands/import-table";
import listExportsCommand from "./commands/list-exports";
import listImportsCommand from "./commands/list-imports";
import describeKinesisStreamingDestinationCommand from "./commands/describe-kinesis-streaming-destination";
import disableKinesisStreamingDestinationCommand from "./commands/disable-kinesis-streaming-destination";
import enableKinesisStreamingDestinationCommand from "./commands/enable-kinesis-streaming-destination";
import updateKinesisStreamingDestinationCommand from "./commands/update-kinesis-streaming-destination";
import describeContributorInsightsCommand from "./commands/describe-contributor-insights";
import listContributorInsightsCommand from "./commands/list-contributor-insights";
import updateContributorInsightsCommand from "./commands/update-contributor-insights";
import deleteResourcePolicyCommand from "./commands/delete-resource-policy";
import getResourcePolicyCommand from "./commands/get-resource-policy";
import putResourcePolicyCommand from "./commands/put-resource-policy";
import describeTableReplicaAutoScalingCommand from "./commands/describe-table-replica-auto-scaling";
import updateTableReplicaAutoScalingCommand from "./commands/update-table-replica-auto-scaling";
import describeEndpointsCommand from "./commands/describe-endpoints";
import describeLimitsCommand from "./commands/describe-limits";

// =====================
// Dependency type definitions
// =====================

/**
 * Signer function type
 */
export type SignerFunction = (body: string, target: string, host: string) => Promise<SignedRequest>;

/**
 * Fetch function type
 */
export type FetchFunction = (url: string, init: RequestInit) => Promise<Response>;

/**
 * Client dependencies
 */
export type ClientDependencies = {
  fetch: FetchFunction;
  signer: SignerFunction;
};

// =====================
// Client configuration
// =====================

/**
 * Client configuration
 */
export type ClientConfig = {
  region: string;
  endpoint: string;
  host: string;
};

// =====================
// DynamoDB client
// =====================

/**
 * DynamoDB client
 */
export type DynamoDBClient = {
  // Table operations
  listTables: (input: CommandInput<typeof listTablesCommand>) => Promise<CommandOutput<typeof listTablesCommand>>;
  describeTable: (
    input: CommandInput<typeof describeTableCommand>,
  ) => Promise<CommandOutput<typeof describeTableCommand>>;
  createTable: (input: CommandInput<typeof createTableCommand>) => Promise<CommandOutput<typeof createTableCommand>>;
  updateTable: (input: CommandInput<typeof updateTableCommand>) => Promise<CommandOutput<typeof updateTableCommand>>;
  deleteTable: (input: CommandInput<typeof deleteTableCommand>) => Promise<CommandOutput<typeof deleteTableCommand>>;

  // Item operations
  getItem: (input: CommandInput<typeof getItemCommand>) => Promise<CommandOutput<typeof getItemCommand>>;
  putItem: (input: CommandInput<typeof putItemCommand>) => Promise<CommandOutput<typeof putItemCommand>>;
  updateItem: (input: CommandInput<typeof updateItemCommand>) => Promise<CommandOutput<typeof updateItemCommand>>;
  deleteItem: (input: CommandInput<typeof deleteItemCommand>) => Promise<CommandOutput<typeof deleteItemCommand>>;

  // Query and scan
  query: (input: CommandInput<typeof queryCommand>) => Promise<CommandOutput<typeof queryCommand>>;
  scan: (input: CommandInput<typeof scanCommand>) => Promise<CommandOutput<typeof scanCommand>>;

  // Batch operations
  batchGetItem: (input: CommandInput<typeof batchGetItemCommand>) => Promise<CommandOutput<typeof batchGetItemCommand>>;
  batchWriteItem: (
    input: CommandInput<typeof batchWriteItemCommand>,
  ) => Promise<CommandOutput<typeof batchWriteItemCommand>>;

  // Transaction operations
  transactGetItems: (
    input: CommandInput<typeof transactGetItemsCommand>,
  ) => Promise<CommandOutput<typeof transactGetItemsCommand>>;
  transactWriteItems: (
    input: CommandInput<typeof transactWriteItemsCommand>,
  ) => Promise<CommandOutput<typeof transactWriteItemsCommand>>;

  // PartiQL operations
  executeStatement: (
    input: CommandInput<typeof executeStatementCommand>,
  ) => Promise<CommandOutput<typeof executeStatementCommand>>;
  batchExecuteStatement: (
    input: CommandInput<typeof batchExecuteStatementCommand>,
  ) => Promise<CommandOutput<typeof batchExecuteStatementCommand>>;
  executeTransaction: (
    input: CommandInput<typeof executeTransactionCommand>,
  ) => Promise<CommandOutput<typeof executeTransactionCommand>>;

  // Backup and restore operations
  createBackup: (input: CommandInput<typeof createBackupCommand>) => Promise<CommandOutput<typeof createBackupCommand>>;
  deleteBackup: (input: CommandInput<typeof deleteBackupCommand>) => Promise<CommandOutput<typeof deleteBackupCommand>>;
  describeBackup: (
    input: CommandInput<typeof describeBackupCommand>,
  ) => Promise<CommandOutput<typeof describeBackupCommand>>;
  describeContinuousBackups: (
    input: CommandInput<typeof describeContinuousBackupsCommand>,
  ) => Promise<CommandOutput<typeof describeContinuousBackupsCommand>>;
  listBackups: (input: CommandInput<typeof listBackupsCommand>) => Promise<CommandOutput<typeof listBackupsCommand>>;
  restoreTableFromBackup: (
    input: CommandInput<typeof restoreTableFromBackupCommand>,
  ) => Promise<CommandOutput<typeof restoreTableFromBackupCommand>>;
  restoreTableToPointInTime: (
    input: CommandInput<typeof restoreTableToPointInTimeCommand>,
  ) => Promise<CommandOutput<typeof restoreTableToPointInTimeCommand>>;
  updateContinuousBackups: (
    input: CommandInput<typeof updateContinuousBackupsCommand>,
  ) => Promise<CommandOutput<typeof updateContinuousBackupsCommand>>;

  // Global table operations
  createGlobalTable: (
    input: CommandInput<typeof createGlobalTableCommand>,
  ) => Promise<CommandOutput<typeof createGlobalTableCommand>>;
  describeGlobalTable: (
    input: CommandInput<typeof describeGlobalTableCommand>,
  ) => Promise<CommandOutput<typeof describeGlobalTableCommand>>;
  describeGlobalTableSettings: (
    input: CommandInput<typeof describeGlobalTableSettingsCommand>,
  ) => Promise<CommandOutput<typeof describeGlobalTableSettingsCommand>>;
  listGlobalTables: (
    input: CommandInput<typeof listGlobalTablesCommand>,
  ) => Promise<CommandOutput<typeof listGlobalTablesCommand>>;
  updateGlobalTable: (
    input: CommandInput<typeof updateGlobalTableCommand>,
  ) => Promise<CommandOutput<typeof updateGlobalTableCommand>>;
  updateGlobalTableSettings: (
    input: CommandInput<typeof updateGlobalTableSettingsCommand>,
  ) => Promise<CommandOutput<typeof updateGlobalTableSettingsCommand>>;

  // Tag management operations
  listTagsOfResource: (
    input: CommandInput<typeof listTagsOfResourceCommand>,
  ) => Promise<CommandOutput<typeof listTagsOfResourceCommand>>;
  tagResource: (input: CommandInput<typeof tagResourceCommand>) => Promise<CommandOutput<typeof tagResourceCommand>>;
  untagResource: (
    input: CommandInput<typeof untagResourceCommand>,
  ) => Promise<CommandOutput<typeof untagResourceCommand>>;

  // TTL operations
  describeTimeToLive: (
    input: CommandInput<typeof describeTimeToLiveCommand>,
  ) => Promise<CommandOutput<typeof describeTimeToLiveCommand>>;
  updateTimeToLive: (
    input: CommandInput<typeof updateTimeToLiveCommand>,
  ) => Promise<CommandOutput<typeof updateTimeToLiveCommand>>;

  // Import/Export operations
  describeExport: (
    input: CommandInput<typeof describeExportCommand>,
  ) => Promise<CommandOutput<typeof describeExportCommand>>;
  describeImport: (
    input: CommandInput<typeof describeImportCommand>,
  ) => Promise<CommandOutput<typeof describeImportCommand>>;
  exportTableToPointInTime: (
    input: CommandInput<typeof exportTableToPointInTimeCommand>,
  ) => Promise<CommandOutput<typeof exportTableToPointInTimeCommand>>;
  importTable: (input: CommandInput<typeof importTableCommand>) => Promise<CommandOutput<typeof importTableCommand>>;
  listExports: (input: CommandInput<typeof listExportsCommand>) => Promise<CommandOutput<typeof listExportsCommand>>;
  listImports: (input: CommandInput<typeof listImportsCommand>) => Promise<CommandOutput<typeof listImportsCommand>>;

  // Kinesis streaming operations
  describeKinesisStreamingDestination: (
    input: CommandInput<typeof describeKinesisStreamingDestinationCommand>,
  ) => Promise<CommandOutput<typeof describeKinesisStreamingDestinationCommand>>;
  disableKinesisStreamingDestination: (
    input: CommandInput<typeof disableKinesisStreamingDestinationCommand>,
  ) => Promise<CommandOutput<typeof disableKinesisStreamingDestinationCommand>>;
  enableKinesisStreamingDestination: (
    input: CommandInput<typeof enableKinesisStreamingDestinationCommand>,
  ) => Promise<CommandOutput<typeof enableKinesisStreamingDestinationCommand>>;
  updateKinesisStreamingDestination: (
    input: CommandInput<typeof updateKinesisStreamingDestinationCommand>,
  ) => Promise<CommandOutput<typeof updateKinesisStreamingDestinationCommand>>;

  // Contributor Insights operations
  describeContributorInsights: (
    input: CommandInput<typeof describeContributorInsightsCommand>,
  ) => Promise<CommandOutput<typeof describeContributorInsightsCommand>>;
  listContributorInsights: (
    input: CommandInput<typeof listContributorInsightsCommand>,
  ) => Promise<CommandOutput<typeof listContributorInsightsCommand>>;
  updateContributorInsights: (
    input: CommandInput<typeof updateContributorInsightsCommand>,
  ) => Promise<CommandOutput<typeof updateContributorInsightsCommand>>;

  // Resource policy operations
  deleteResourcePolicy: (
    input: CommandInput<typeof deleteResourcePolicyCommand>,
  ) => Promise<CommandOutput<typeof deleteResourcePolicyCommand>>;
  getResourcePolicy: (
    input: CommandInput<typeof getResourcePolicyCommand>,
  ) => Promise<CommandOutput<typeof getResourcePolicyCommand>>;
  putResourcePolicy: (
    input: CommandInput<typeof putResourcePolicyCommand>,
  ) => Promise<CommandOutput<typeof putResourcePolicyCommand>>;

  // AutoScaling operations
  describeTableReplicaAutoScaling: (
    input: CommandInput<typeof describeTableReplicaAutoScalingCommand>,
  ) => Promise<CommandOutput<typeof describeTableReplicaAutoScalingCommand>>;
  updateTableReplicaAutoScaling: (
    input: CommandInput<typeof updateTableReplicaAutoScalingCommand>,
  ) => Promise<CommandOutput<typeof updateTableReplicaAutoScalingCommand>>;

  // Other operations
  describeEndpoints: (
    input: CommandInput<typeof describeEndpointsCommand>,
  ) => Promise<CommandOutput<typeof describeEndpointsCommand>>;
  describeLimits: (
    input: CommandInput<typeof describeLimitsCommand>,
  ) => Promise<CommandOutput<typeof describeLimitsCommand>>;
};

// =====================
// Internal helpers
// =====================

/**
 * Execute DynamoDB command
 */
const executeCommand = async (
  config: ClientConfig,
  deps: ClientDependencies,
  command: string,
  payload: Record<string, unknown>,
): Promise<unknown> => {
  const body = JSON.stringify(payload);
  const target = `DynamoDB_20120810.${command}`;

  const { headers, body: signedBody } = await deps.signer(body, target, config.host);

  const res = await deps.fetch(config.endpoint, {
    method: "POST",
    headers,
    body: signedBody,
  });

  if (!res.ok) {
    const text = await res.text();
    throw parseDynamoDBError({
      status: res.status,
      statusText: res.statusText,
      body: text,
    });
  }

  const json = await res.json();
  return json;
};

/**
 * Generate client method from command definition
 */
const createCommandMethod =
  <TInput, TOutput>(
    commandDef: CommandDefinition<string, TInput, TOutput>,
    config: ClientConfig,
    deps: ClientDependencies,
  ): ((input: TInput) => Promise<TOutput>) =>
  (input: TInput): Promise<TOutput> =>
    executeCommand(config, deps, commandDef.name, input as Record<string, unknown>) as Promise<TOutput>;

// =====================
// Client creation
// =====================

/**
 * Create DynamoDB client
 */
export const createClient = (config: ClientConfig, deps: ClientDependencies): DynamoDBClient => {
  return {
    // Table operations
    listTables: createCommandMethod(listTablesCommand, config, deps),
    describeTable: createCommandMethod(describeTableCommand, config, deps),
    createTable: createCommandMethod(createTableCommand, config, deps),
    updateTable: createCommandMethod(updateTableCommand, config, deps),
    deleteTable: createCommandMethod(deleteTableCommand, config, deps),

    // Item operations
    getItem: createCommandMethod(getItemCommand, config, deps),
    putItem: createCommandMethod(putItemCommand, config, deps),
    updateItem: createCommandMethod(updateItemCommand, config, deps),
    deleteItem: createCommandMethod(deleteItemCommand, config, deps),

    // Query and scan
    query: createCommandMethod(queryCommand, config, deps),
    scan: createCommandMethod(scanCommand, config, deps),

    // Batch operations
    batchGetItem: createCommandMethod(batchGetItemCommand, config, deps),
    batchWriteItem: createCommandMethod(batchWriteItemCommand, config, deps),

    // Transaction operations
    transactGetItems: createCommandMethod(transactGetItemsCommand, config, deps),
    transactWriteItems: createCommandMethod(transactWriteItemsCommand, config, deps),

    // PartiQL operations
    executeStatement: createCommandMethod(executeStatementCommand, config, deps),
    batchExecuteStatement: createCommandMethod(batchExecuteStatementCommand, config, deps),
    executeTransaction: createCommandMethod(executeTransactionCommand, config, deps),

    // Backup and restore operations
    createBackup: createCommandMethod(createBackupCommand, config, deps),
    deleteBackup: createCommandMethod(deleteBackupCommand, config, deps),
    describeBackup: createCommandMethod(describeBackupCommand, config, deps),
    describeContinuousBackups: createCommandMethod(describeContinuousBackupsCommand, config, deps),
    listBackups: createCommandMethod(listBackupsCommand, config, deps),
    restoreTableFromBackup: createCommandMethod(restoreTableFromBackupCommand, config, deps),
    restoreTableToPointInTime: createCommandMethod(restoreTableToPointInTimeCommand, config, deps),
    updateContinuousBackups: createCommandMethod(updateContinuousBackupsCommand, config, deps),

    // Global table operations
    createGlobalTable: createCommandMethod(createGlobalTableCommand, config, deps),
    describeGlobalTable: createCommandMethod(describeGlobalTableCommand, config, deps),
    describeGlobalTableSettings: createCommandMethod(describeGlobalTableSettingsCommand, config, deps),
    listGlobalTables: createCommandMethod(listGlobalTablesCommand, config, deps),
    updateGlobalTable: createCommandMethod(updateGlobalTableCommand, config, deps),
    updateGlobalTableSettings: createCommandMethod(updateGlobalTableSettingsCommand, config, deps),

    // Tag management operations
    listTagsOfResource: createCommandMethod(listTagsOfResourceCommand, config, deps),
    tagResource: createCommandMethod(tagResourceCommand, config, deps),
    untagResource: createCommandMethod(untagResourceCommand, config, deps),

    // TTL operations
    describeTimeToLive: createCommandMethod(describeTimeToLiveCommand, config, deps),
    updateTimeToLive: createCommandMethod(updateTimeToLiveCommand, config, deps),

    // Import/Export operations
    describeExport: createCommandMethod(describeExportCommand, config, deps),
    describeImport: createCommandMethod(describeImportCommand, config, deps),
    exportTableToPointInTime: createCommandMethod(exportTableToPointInTimeCommand, config, deps),
    importTable: createCommandMethod(importTableCommand, config, deps),
    listExports: createCommandMethod(listExportsCommand, config, deps),
    listImports: createCommandMethod(listImportsCommand, config, deps),

    // Kinesis streaming operations
    describeKinesisStreamingDestination: createCommandMethod(describeKinesisStreamingDestinationCommand, config, deps),
    disableKinesisStreamingDestination: createCommandMethod(disableKinesisStreamingDestinationCommand, config, deps),
    enableKinesisStreamingDestination: createCommandMethod(enableKinesisStreamingDestinationCommand, config, deps),
    updateKinesisStreamingDestination: createCommandMethod(updateKinesisStreamingDestinationCommand, config, deps),

    // Contributor Insights operations
    describeContributorInsights: createCommandMethod(describeContributorInsightsCommand, config, deps),
    listContributorInsights: createCommandMethod(listContributorInsightsCommand, config, deps),
    updateContributorInsights: createCommandMethod(updateContributorInsightsCommand, config, deps),

    // Resource policy operations
    deleteResourcePolicy: createCommandMethod(deleteResourcePolicyCommand, config, deps),
    getResourcePolicy: createCommandMethod(getResourcePolicyCommand, config, deps),
    putResourcePolicy: createCommandMethod(putResourcePolicyCommand, config, deps),

    // AutoScaling operations
    describeTableReplicaAutoScaling: createCommandMethod(describeTableReplicaAutoScalingCommand, config, deps),
    updateTableReplicaAutoScaling: createCommandMethod(updateTableReplicaAutoScalingCommand, config, deps),

    // Other operations
    describeEndpoints: createCommandMethod(describeEndpointsCommand, config, deps),
    describeLimits: createCommandMethod(describeLimitsCommand, config, deps),
  };
};

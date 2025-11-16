/**
 * @file DynamoDB client (dependency injection enabled)
 */

import type { SignedRequest } from "../crypto/signer";
import type { CommandDefinition, CommandInput, CommandOutput } from "./commands/types";

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

// =====================
// Dependency type definitions
// =====================

/**
 * Signer function type
 */
export type SignerFunction = (
  body: string,
  target: string,
  host: string,
) => Promise<SignedRequest>;

/**
 * Fetch function type
 */
export type FetchFunction = (
  url: string,
  init: RequestInit,
) => Promise<Response>;

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
  listTables: (input?: CommandInput<typeof listTablesCommand>) => Promise<CommandOutput<typeof listTablesCommand>>;
  describeTable: (input: CommandInput<typeof describeTableCommand>) => Promise<CommandOutput<typeof describeTableCommand>>;
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
  batchWriteItem: (input: CommandInput<typeof batchWriteItemCommand>) => Promise<CommandOutput<typeof batchWriteItemCommand>>;

  // Transaction operations
  transactGetItems: (input: CommandInput<typeof transactGetItemsCommand>) => Promise<CommandOutput<typeof transactGetItemsCommand>>;
  transactWriteItems: (input: CommandInput<typeof transactWriteItemsCommand>) => Promise<CommandOutput<typeof transactWriteItemsCommand>>;

  // PartiQL operations
  executeStatement: (input: CommandInput<typeof executeStatementCommand>) => Promise<CommandOutput<typeof executeStatementCommand>>;
  batchExecuteStatement: (input: CommandInput<typeof batchExecuteStatementCommand>) => Promise<CommandOutput<typeof batchExecuteStatementCommand>>;
  executeTransaction: (input: CommandInput<typeof executeTransactionCommand>) => Promise<CommandOutput<typeof executeTransactionCommand>>;

  // Backup and restore operations
  createBackup: (input: CommandInput<typeof createBackupCommand>) => Promise<CommandOutput<typeof createBackupCommand>>;
  deleteBackup: (input: CommandInput<typeof deleteBackupCommand>) => Promise<CommandOutput<typeof deleteBackupCommand>>;
  describeBackup: (input: CommandInput<typeof describeBackupCommand>) => Promise<CommandOutput<typeof describeBackupCommand>>;
  describeContinuousBackups: (input: CommandInput<typeof describeContinuousBackupsCommand>) => Promise<CommandOutput<typeof describeContinuousBackupsCommand>>;
  listBackups: (input?: CommandInput<typeof listBackupsCommand>) => Promise<CommandOutput<typeof listBackupsCommand>>;
  restoreTableFromBackup: (input: CommandInput<typeof restoreTableFromBackupCommand>) => Promise<CommandOutput<typeof restoreTableFromBackupCommand>>;
  restoreTableToPointInTime: (input: CommandInput<typeof restoreTableToPointInTimeCommand>) => Promise<CommandOutput<typeof restoreTableToPointInTimeCommand>>;
  updateContinuousBackups: (input: CommandInput<typeof updateContinuousBackupsCommand>) => Promise<CommandOutput<typeof updateContinuousBackupsCommand>>;
};

// =====================
// Internal helpers
// =====================

/**
 * Execute DynamoDB command
 */
async function executeCommand(
  config: ClientConfig,
  deps: ClientDependencies,
  command: string,
  payload: Record<string, unknown>,
): Promise<unknown> {
  const body = JSON.stringify(payload);
  const target = `DynamoDB_20120810.${command}`;

  const { headers, body: signedBody } = await deps.signer(
    body,
    target,
    config.host,
  );

  const res = await deps.fetch(config.endpoint, {
    method: "POST",
    headers,
    body: signedBody,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `DynamoDB error: ${res.status} ${res.statusText} - ${text}`,
    );
  }

  const json = await res.json();
  return json;
}

/**
 * Generate client method from command definition
 */
function createCommandMethod<TInput, TOutput>(
  commandDef: CommandDefinition<string, TInput, TOutput>,
  config: ClientConfig,
  deps: ClientDependencies,
): (input: TInput) => Promise<TOutput> {
  return async (input: TInput): Promise<TOutput> => {
    // Convert input to API payload format
    // eslint-disable-next-line custom/no-as-outside-guard -- Safe type assertion for DynamoDB API payload
    const result = await executeCommand(config, deps, commandDef.name, input as Record<string, unknown>);
    // Assert DynamoDB response type
    // eslint-disable-next-line custom/no-as-outside-guard -- Safe type assertion for DynamoDB API response
    return result as TOutput;
  };
}

// =====================
// Client creation
// =====================

/**
 * Create DynamoDB client
 */
export function createClient(
  config: ClientConfig,
  deps: ClientDependencies,
): DynamoDBClient {
  return {
    // Table operations
    listTables: async (input = {}) => {
      const result = await executeCommand(config, deps, listTablesCommand.name, input);
      // Assert DynamoDB response type
      // eslint-disable-next-line custom/no-as-outside-guard -- Safe type assertion for DynamoDB API response
      return result as CommandOutput<typeof listTablesCommand>;
    },
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
    listBackups: async (input = {}) => {
      const result = await executeCommand(config, deps, listBackupsCommand.name, input);
      // eslint-disable-next-line custom/no-as-outside-guard -- Safe type assertion for DynamoDB API response
      return result as CommandOutput<typeof listBackupsCommand>;
    },
    restoreTableFromBackup: createCommandMethod(restoreTableFromBackupCommand, config, deps),
    restoreTableToPointInTime: createCommandMethod(restoreTableToPointInTimeCommand, config, deps),
    updateContinuousBackups: createCommandMethod(updateContinuousBackupsCommand, config, deps),
  };
}

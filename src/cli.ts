/**
 * @file DynamoDB Console CLI
 */

import { cac } from "cac";
import { getCredentialsFromEnv, getEndpointFromEnv } from "./config";
import { createClient } from "./dynamodb/index";

// =====================
// Helper functions
// =====================

async function listTablesHandler(region: string): Promise<void> {
  const credentials = getCredentialsFromEnv();
  const endpoint = getEndpointFromEnv();
  const client = createClient({ region, credentials, endpoint });
  const result = await client.listTables({});

  if (!result.TableNames) {
    console.log("No tables found");
    return;
  }

  console.log("Tables:");
  for (const tableName of result.TableNames) {
    console.log(`  - ${tableName}`);
  }
  console.log(`\nTotal: ${result.TableNames.length} tables`);
}

// =====================
// CLI definition
// =====================

const cli = cac("ddb-console");

cli
  .command("[...args]", "List all DynamoDB tables (default)")
  .option("--region <region>", "AWS region", { default: "ap-northeast-1" })
  .action(async (args: string[], options: { region: string }) => {
    try {
      await listTablesHandler(options.region);
    } catch (e) {
      console.error("Error:", e);
      process.exit(1);
    }
  });

cli
  .command("list-tables", "List all DynamoDB tables")
  .option("--region <region>", "AWS region", { default: "ap-northeast-1" })
  .action(async (options: { region: string }) => {
    try {
      await listTablesHandler(options.region);
    } catch (e) {
      console.error("Error:", e);
      process.exit(1);
    }
  });

cli
  .command("query <table>", "Query a DynamoDB table")
  .option("--region <region>", "AWS region", { default: "ap-northeast-1" })
  .option("--key <key>", "Key condition expression")
  .option("--values <values>", "Expression attribute values (JSON string)")
  .option("--index <index>", "Index name")
  .option("--limit <limit>", "Limit number of results")
  .action(
    async (
      table: string,
      options: {
        region: string;
        key?: string;
        values?: string;
        index?: string;
        limit?: string;
      },
    ) => {
      try {
        if (!options.key) {
          throw new Error("--key is required");
        }
        if (!options.values) {
          throw new Error("--values is required");
        }

        const credentials = getCredentialsFromEnv();
        const endpoint = getEndpointFromEnv();
        const client = createClient({
          region: options.region,
          credentials,
          endpoint,
        });
        const values = JSON.parse(options.values);

        const result = await client.query({
          TableName: table,
          KeyConditionExpression: options.key,
          ExpressionAttributeValues: values,
          IndexName: options.index,
          Limit: options.limit ? Number.parseInt(options.limit, 10) : undefined,
        });

        console.log(JSON.stringify(result, null, 2));
      } catch (e) {
        console.error("Error:", e);
        process.exit(1);
      }
    },
  );

cli.help();
cli.version("0.1.0");

cli.parse();

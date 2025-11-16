/**
 * @file DynamoDB client entry point
 */

import { getCredentialsFromEnv, getEndpointFromEnv } from "./config";
import { createClient } from "./dynamodb/index";
import { marshallObject } from "./dynamodb/converters/marshall";
import { unmarshallItem } from "./dynamodb/converters/unmarshall";

// =====================
// Example Query usage
// =====================

async function main() {
  try {
    const credentials = getCredentialsFromEnv();
    const endpoint = getEndpointFromEnv();
    const client = createClient({
      region: "ap-northeast-1",
      credentials,
      endpoint,
    });

    const result = await client.query({
      TableName: "Users",
      KeyConditionExpression: "UserId = :uid",
      ExpressionAttributeValues: marshallObject({
        ":uid": "123",
      }),
      ScanIndexForward: true, // ascending order
    });

    console.dir(result, { depth: null });

    if (!result.Items) {
      return;
    }

    for (const item of result.Items) {
      const unmarshalled = unmarshallItem(item);
      console.log(unmarshalled);
    }
  } catch (e) {
    console.error(e);
  }
}

main();

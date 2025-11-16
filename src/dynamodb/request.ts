/**
 * @file DynamoDB request abstraction layer
 */

import type { DynamoDBClientConfig } from "./config";
import { signDynamoRequest } from "../crypto/signer";

// =====================
// DynamoDB request abstraction
// =====================

/**
 * Execute arbitrary DynamoDB command
 */
export async function executeDynamoCommand(
  config: DynamoDBClientConfig,
  command: string,
  payload: Record<string, unknown>,
): Promise<unknown> {
  const body = JSON.stringify(payload);
  const target = `DynamoDB_20120810.${command}`;

  const { headers, body: signedBody } = await signDynamoRequest(
    config.signerConfig,
    body,
    target,
    config.host,
  );

  const res = await fetch(config.endpoint, {
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

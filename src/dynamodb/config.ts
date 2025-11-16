/**
 * @file DynamoDB client configuration
 */

import type { AWSCredentials } from "../config";
import type { SignerConfig } from "../crypto/signer";

// DynamoDB client configuration
export type DynamoDBClientConfig = {
  region: string;
  endpoint: string;
  host: string;
  signerConfig: SignerConfig;
};

/**
 * Resolve endpoint and host
 */
function resolveEndpointAndHost(
  region: string,
  customEndpoint?: string,
): { endpoint: string; host: string } {
  if (customEndpoint) {
    const url = new URL(customEndpoint);
    return {
      endpoint: customEndpoint,
      host: url.host,
    };
  }

  const host = `dynamodb.${region}.amazonaws.com`;
  return {
    endpoint: `https://${host}/`,
    host,
  };
}

/**
 * Create DynamoDB client configuration
 */
export function createDynamoDBConfig(
  region: string,
  credentials: AWSCredentials,
  customEndpoint?: string,
): DynamoDBClientConfig {
  const service = "dynamodb";
  const { endpoint, host } = resolveEndpointAndHost(region, customEndpoint);

  const signerConfig: SignerConfig = {
    region,
    service,
    credentials,
  };

  return {
    region,
    endpoint,
    host,
    signerConfig,
  };
}

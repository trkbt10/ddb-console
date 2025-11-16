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
export const resolveEndpointAndHost = (region: string, customEndpoint?: string): URL => {
  try {
    if (customEndpoint) {
      return new URL(customEndpoint);
    }

    const host = `dynamodb.${region}.amazonaws.com`;
    return new URL(`https://${host}/`);
  } catch (error) {
    const endpoint = customEndpoint ?? `dynamodb.${region}.amazonaws.com`;
    throw new Error(
      `Invalid DynamoDB endpoint: ${endpoint}. ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

/**
 * Create DynamoDB client configuration
 */
export const createDynamoDBConfig = (
  region: string,
  credentials: AWSCredentials,
  customEndpoint?: string,
): DynamoDBClientConfig => {
  const service = "dynamodb";
  const url = resolveEndpointAndHost(region, customEndpoint);

  const signerConfig: SignerConfig = {
    region,
    service,
    credentials,
  };

  return {
    region,
    endpoint: url.href,
    host: url.host,
    signerConfig,
  };
};

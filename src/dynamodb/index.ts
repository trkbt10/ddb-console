/**
 * @file DynamoDB client public API
 */

import type { AWSCredentials } from "../config";
import { signDynamoRequest } from "../crypto/signer";
import {
  createClient as createDynamoDBClient,
  type DynamoDBClient,
  type ClientConfig,
  type ClientDependencies,
} from "./client";

// =====================
// Client creation options
// =====================

/**
 * Client creation options
 */
export type CreateClientOptions = {
  region: string;
  credentials: AWSCredentials;
  endpoint?: string;
  dependencies?: Partial<ClientDependencies>;
};

// =====================
// Endpoint resolution
// =====================

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

// =====================
// Client creation
// =====================

/**
 * Create DynamoDB client
 */
export function createClient(options: CreateClientOptions): DynamoDBClient {
  const { region, credentials, endpoint: customEndpoint, dependencies } = options;

  const { endpoint, host } = resolveEndpointAndHost(region, customEndpoint);

  const config: ClientConfig = {
    region,
    endpoint,
    host,
  };

  const defaultDeps: ClientDependencies = {
    fetch: globalThis.fetch.bind(globalThis),
    signer: async (body, target, host) => {
      return await signDynamoRequest(
        {
          region,
          service: "dynamodb",
          credentials,
        },
        body,
        target,
        host,
      );
    },
  };

  const finalDeps: ClientDependencies = {
    ...defaultDeps,
    ...dependencies,
  };

  return createDynamoDBClient(config, finalDeps);
}

// =====================
// Exported types
// =====================

export type { DynamoDBClient } from "./client";

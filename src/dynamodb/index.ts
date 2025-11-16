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
import { resolveEndpointAndHost } from "./config";

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
// Client creation
// =====================

/**
 * Create DynamoDB client
 */
export function createClient(options: CreateClientOptions): DynamoDBClient {
  const { region, credentials, endpoint: customEndpoint, dependencies } = options;

  const url = resolveEndpointAndHost(region, customEndpoint);

  const config: ClientConfig = {
    region,
    endpoint: url.href,
    host: url.host,
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

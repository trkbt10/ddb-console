/**
 * @file DynamoDB error definitions and utilities
 */

// Import base types and utilities
import { createDynamoDBError, extractErrorName } from "./types";
import type { DynamoDBError, DynamoDBErrorFactory } from "./types";

// Export base types and utilities
export { createDynamoDBError, extractErrorName };
export type { DynamoDBError, DynamoDBErrorFactory, DynamoDBErrorProperties, ErrorMetadata, DynamoDBErrorResponse } from "./types";

// Import all error definitions as modules
import * as conditionalCheckFailed from "./conditional-check-failed-exception";
import * as resourceNotFound from "./resource-not-found-exception";
import * as validation from "./validation-exception";
import * as provisionedThroughputExceeded from "./provisioned-throughput-exceeded-exception";
import * as resourceInUse from "./resource-in-use-exception";
import * as itemCollectionSizeLimitExceeded from "./item-collection-size-limit-exceeded-exception";
import * as limitExceeded from "./limit-exceeded-exception";
import * as throttling from "./throttling-exception";
import * as requestLimit from "./request-limit-exceeded";
import * as accessDenied from "./access-denied-exception";
import * as incompleteSignature from "./incomplete-signature-exception";
import * as missingAuthToken from "./missing-authentication-token-exception";
import * as unrecognizedClient from "./unrecognized-client-exception";
import * as replicatedWriteConflict from "./replicated-write-conflict-exception";
import * as internalServer from "./internal-server-error";
import * as serviceUnavail from "./service-unavailable";
import * as incompleteSig from "./incomplete-signature";
import * as internalFail from "./internal-failure";
import * as invalidAct from "./invalid-action";
import * as invalidClientToken from "./invalid-client-token-id";
import * as notAuth from "./not-authorized";
import * as optIn from "./opt-in-required";
import * as requestExp from "./request-expired";
import * as validationErr from "./validation-error";

// Build error definitions map from modules in a single pass
const errorModules = [
  conditionalCheckFailed,
  resourceNotFound,
  validation,
  provisionedThroughputExceeded,
  resourceInUse,
  itemCollectionSizeLimitExceeded,
  limitExceeded,
  throttling,
  requestLimit,
  accessDenied,
  incompleteSignature,
  missingAuthToken,
  unrecognizedClient,
  replicatedWriteConflict,
  internalServer,
  serviceUnavail,
  incompleteSig,
  internalFail,
  invalidAct,
  invalidClientToken,
  notAuth,
  optIn,
  requestExp,
  validationErr,
] as const;

export const errorDefinitions = Object.fromEntries(
  errorModules.map(mod => [mod.ERROR_NAME, mod.default]),
) as Record<string, DynamoDBErrorFactory>;

/**
 * Parse DynamoDB error response and create appropriate error instance
 */
export function parseDynamoDBError(response: {
  status: number;
  statusText: string;
  body: string;
}): DynamoDBError {
  try {
    // Try to parse JSON error response
    const errorResponse = JSON.parse(response.body);
    const errorName = extractErrorName(errorResponse.__type ? errorResponse.__type : "");

    // Look up error factory
    const createError = errorDefinitions[errorName as keyof typeof errorDefinitions];

    if (createError) {
      const message = errorResponse.message ? errorResponse.message : "";
      return createError(message);
    }

    // Unknown error type - create generic error with status code
    const errorNameFallback = errorName ? errorName : "UnknownError";
    const messageFallback = errorResponse.message ? errorResponse.message : response.statusText;
    return createDynamoDBError(
      errorNameFallback,
      messageFallback,
      {
        httpStatusCode: response.status,
        retryable: response.status >= 500,
      },
    );
  } catch {
    // Failed to parse JSON - create generic error
    return createDynamoDBError(
      "UnknownError",
      `DynamoDB error: ${response.status} ${response.statusText} - ${response.body}`,
      {
        httpStatusCode: response.status,
        retryable: response.status >= 500,
      },
    );
  }
}

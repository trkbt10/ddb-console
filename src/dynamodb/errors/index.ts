/**
 * @file DynamoDB error definitions and utilities
 */

// Import base types and utilities
import { DynamoDBError, createError, extractErrorName } from "./types";

// Export base types and utilities
export { DynamoDBError, createError, extractErrorName };
export type { ErrorDefinition, ErrorMetadata, DynamoDBErrorResponse } from "./types";

// Import all error definitions
import conditionalCheckFailedException from "./conditional-check-failed-exception";
import resourceNotFoundException from "./resource-not-found-exception";
import validationException from "./validation-exception";
import provisionedThroughputExceededException from "./provisioned-throughput-exceeded-exception";
import resourceInUseException from "./resource-in-use-exception";
import itemCollectionSizeLimitExceededException from "./item-collection-size-limit-exceeded-exception";
import limitExceededException from "./limit-exceeded-exception";
import throttlingException from "./throttling-exception";
import requestLimitExceeded from "./request-limit-exceeded";
import accessDeniedException from "./access-denied-exception";
import incompleteSignatureException from "./incomplete-signature-exception";
import missingAuthenticationTokenException from "./missing-authentication-token-exception";
import unrecognizedClientException from "./unrecognized-client-exception";
import replicatedWriteConflictException from "./replicated-write-conflict-exception";
import internalServerError from "./internal-server-error";
import serviceUnavailable from "./service-unavailable";
import incompleteSignature from "./incomplete-signature";
import internalFailure from "./internal-failure";
import invalidAction from "./invalid-action";
import invalidClientTokenId from "./invalid-client-token-id";
import notAuthorized from "./not-authorized";
import optInRequired from "./opt-in-required";
import requestExpired from "./request-expired";
import validationError from "./validation-error";

// Error definitions map for efficient lookup
const errorDefinitions = {
  ConditionalCheckFailedException: conditionalCheckFailedException,
  ResourceNotFoundException: resourceNotFoundException,
  ValidationException: validationException,
  ProvisionedThroughputExceededException: provisionedThroughputExceededException,
  ResourceInUseException: resourceInUseException,
  ItemCollectionSizeLimitExceededException: itemCollectionSizeLimitExceededException,
  LimitExceededException: limitExceededException,
  ThrottlingException: throttlingException,
  RequestLimitExceeded: requestLimitExceeded,
  AccessDeniedException: accessDeniedException,
  IncompleteSignatureException: incompleteSignatureException,
  MissingAuthenticationTokenException: missingAuthenticationTokenException,
  UnrecognizedClientException: unrecognizedClientException,
  ReplicatedWriteConflictException: replicatedWriteConflictException,
  InternalServerError: internalServerError,
  ServiceUnavailable: serviceUnavailable,
  IncompleteSignature: incompleteSignature,
  InternalFailure: internalFailure,
  InvalidAction: invalidAction,
  InvalidClientTokenId: invalidClientTokenId,
  NotAuthorized: notAuthorized,
  OptInRequired: optInRequired,
  RequestExpired: requestExpired,
  ValidationError: validationError,
} as const;

// Export individual error definitions
export {
  conditionalCheckFailedException,
  resourceNotFoundException,
  validationException,
  provisionedThroughputExceededException,
  resourceInUseException,
  itemCollectionSizeLimitExceededException,
  limitExceededException,
  throttlingException,
  requestLimitExceeded,
  accessDeniedException,
  incompleteSignatureException,
  missingAuthenticationTokenException,
  unrecognizedClientException,
  replicatedWriteConflictException,
  internalServerError,
  serviceUnavailable,
  incompleteSignature,
  internalFailure,
  invalidAction,
  invalidClientTokenId,
  notAuthorized,
  optInRequired,
  requestExpired,
  validationError,
};

// Export error definitions map
export { errorDefinitions };

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

    // Look up error definition
    const definition = errorDefinitions[errorName as keyof typeof errorDefinitions];

    if (definition) {
      const message = errorResponse.message ? errorResponse.message : "";
      return createError(definition, message);
    }

    // Unknown error type - create generic error with status code
    const errorNameFallback = errorName ? errorName : "UnknownError";
    const messageFallback = errorResponse.message ? errorResponse.message : response.statusText;
    return new DynamoDBError(
      errorNameFallback,
      messageFallback,
      {
        httpStatusCode: response.status,
        retryable: response.status >= 500,
      },
    );
  } catch {
    // Failed to parse JSON - create generic error
    return new DynamoDBError(
      "UnknownError",
      `DynamoDB error: ${response.status} ${response.statusText} - ${response.body}`,
      {
        httpStatusCode: response.status,
        retryable: response.status >= 500,
      },
    );
  }
}

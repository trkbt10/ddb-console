/**
 * @file DynamoDB error definitions and utilities
 */

// Import base types and utilities
import { createDynamoDBError, extractErrorName } from "./types";
import type { DynamoDBError, DynamoDBErrorClass } from "./types";

// Import all error classes as a single namespace for internal use
import * as Errors from "./definitions";

// Export base types and utilities
export { createDynamoDBError, extractErrorName };
export type {
  DynamoDBError,
  DynamoDBErrorClass,
  DynamoDBErrorProperties,
  ErrorMetadata,
  DynamoDBErrorResponse,
} from "./types";

// Re-export all error classes
export {
  ConditionalCheckFailedException,
  ResourceNotFoundException,
  ValidationException,
  ResourceInUseException,
  ItemCollectionSizeLimitExceededException,
  LimitExceededException,
  AccessDeniedException,
  IncompleteSignatureException,
  MissingAuthenticationTokenException,
  UnrecognizedClientException,
  InvalidAction,
  InvalidClientTokenId,
  NotAuthorized,
  OptInRequired,
  RequestExpired,
  ValidationError,
  IncompleteSignature,
  ProvisionedThroughputExceededException,
  ThrottlingException,
  RequestLimitExceeded,
  ReplicatedWriteConflictException,
  InternalServerError,
  ServiceUnavailable,
  InternalFailure,
} from "./definitions";

/**
 * Internal error class name to constructor map for dynamic error creation
 */
const errorDefinitions: Record<string, DynamoDBErrorClass> = Errors as Record<string, DynamoDBErrorClass>;

/**
 * Parse DynamoDB error response and create appropriate error instance
 */
export function parseDynamoDBError(response: { status: number; statusText: string; body: string }): DynamoDBError {
  try {
    // Try to parse JSON error response
    const errorResponse = JSON.parse(response.body);
    const errorName = extractErrorName(errorResponse.__type ? errorResponse.__type : "");

    // Look up error class
    const ErrorClass = errorDefinitions[errorName as keyof typeof errorDefinitions];

    if (ErrorClass) {
      const message = errorResponse.message ? errorResponse.message : "";
      return new ErrorClass(message);
    }

    // Unknown error type - create generic error with status code
    const errorNameFallback = errorName ? errorName : "UnknownError";
    const messageFallback = errorResponse.message ? errorResponse.message : response.statusText;
    return createDynamoDBError(errorNameFallback, messageFallback, {
      httpStatusCode: response.status,
      retryable: response.status >= 500,
    });
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

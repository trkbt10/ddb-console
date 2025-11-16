/**
 * @file DynamoDB error type definitions and utilities
 */

/**
 * DynamoDB error metadata
 */
export type ErrorMetadata = {
  readonly httpStatusCode: number;
  readonly retryable: boolean;
};

/**
 * DynamoDB-specific error properties
 */
export type DynamoDBErrorProperties = {
  __type: string;
  httpStatusCode: number;
  retryable: boolean;
};

/**
 * DynamoDB error type (Error + DynamoDB-specific properties)
 */
export type DynamoDBError = Error & DynamoDBErrorProperties;

/**
 * Create DynamoDB error instance
 */
export function createDynamoDBError(
  errorName: string,
  message: string,
  metadata: ErrorMetadata,
): DynamoDBError {
  const error = new Error(message) as DynamoDBError;
  error.name = errorName;
  error.__type = `com.amazonaws.dynamodb.v20120810#${errorName}`;
  error.httpStatusCode = metadata.httpStatusCode;
  error.retryable = metadata.retryable;

  // Maintains proper stack trace for where our error was thrown (only available on V8)
  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, createDynamoDBError);
  }

  return error;
}

/**
 * DynamoDB error factory function type
 */
export type DynamoDBErrorFactory = (message: string) => DynamoDBError;

/**
 * Helper function to define DynamoDB error factory
 */
export function defineError<TName extends string>(
  name: TName,
  metadata: ErrorMetadata,
): DynamoDBErrorFactory {
  return (message: string) => createDynamoDBError(name, message, metadata);
}

/**
 * Parse DynamoDB error response
 */
export type DynamoDBErrorResponse = {
  __type: string;
  message: string;
};

/**
 * Extract error name from __type field
 */
export function extractErrorName(typeField: string): string {
  const parts = typeField.split("#");
  if (parts.length === 2) {
    return parts[1];
  }
  return typeField;
}

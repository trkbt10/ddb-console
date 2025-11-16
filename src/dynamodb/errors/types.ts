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
 * DynamoDB error definition
 */
export type ErrorDefinition<TName extends string> = {
  readonly name: TName;
  readonly metadata: ErrorMetadata;
};

/**
 * Base DynamoDB error class following official AWS error format
 */
export class DynamoDBError extends Error {
  public readonly __type: string;
  public readonly httpStatusCode: number;
  public readonly retryable: boolean;

  constructor(
    errorName: string,
    message: string,
    metadata: ErrorMetadata,
  ) {
    super(message);
    this.name = errorName;
    this.__type = `com.amazonaws.dynamodb.v20120810#${errorName}`;
    this.httpStatusCode = metadata.httpStatusCode;
    this.retryable = metadata.retryable;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Helper function to define error metadata
 */
export function defineError<TName extends string>(
  name: TName,
  metadata: ErrorMetadata,
): ErrorDefinition<TName> {
  return {
    name,
    metadata,
  };
}

/**
 * Helper function to create error instance
 */
export function createError<TName extends string>(
  definition: ErrorDefinition<TName>,
  message: string,
): DynamoDBError {
  return new DynamoDBError(definition.name, message, definition.metadata);
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

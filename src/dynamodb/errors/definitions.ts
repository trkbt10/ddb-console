/**
 * @file Consolidated DynamoDB error class definitions
 */

import { defineErrorClass } from "./types";

// Client errors (4xx)
export const ConditionalCheckFailedException = defineErrorClass("ConditionalCheckFailedException", { httpStatusCode: 400, retryable: false });
export const ResourceNotFoundException = defineErrorClass("ResourceNotFoundException", { httpStatusCode: 400, retryable: false });
export const ValidationException = defineErrorClass("ValidationException", { httpStatusCode: 400, retryable: false });
export const ResourceInUseException = defineErrorClass("ResourceInUseException", { httpStatusCode: 400, retryable: false });
export const ItemCollectionSizeLimitExceededException = defineErrorClass("ItemCollectionSizeLimitExceededException", { httpStatusCode: 400, retryable: false });
export const LimitExceededException = defineErrorClass("LimitExceededException", { httpStatusCode: 400, retryable: true });
export const AccessDeniedException = defineErrorClass("AccessDeniedException", { httpStatusCode: 400, retryable: false });
export const IncompleteSignatureException = defineErrorClass("IncompleteSignatureException", { httpStatusCode: 400, retryable: false });
export const MissingAuthenticationTokenException = defineErrorClass("MissingAuthenticationTokenException", { httpStatusCode: 403, retryable: false });
export const UnrecognizedClientException = defineErrorClass("UnrecognizedClientException", { httpStatusCode: 400, retryable: false });
export const InvalidAction = defineErrorClass("InvalidAction", { httpStatusCode: 400, retryable: false });
export const InvalidClientTokenId = defineErrorClass("InvalidClientTokenId", { httpStatusCode: 403, retryable: false });
export const NotAuthorized = defineErrorClass("NotAuthorized", { httpStatusCode: 400, retryable: false });
export const OptInRequired = defineErrorClass("OptInRequired", { httpStatusCode: 403, retryable: false });
export const RequestExpired = defineErrorClass("RequestExpired", { httpStatusCode: 400, retryable: false });
export const ValidationError = defineErrorClass("ValidationError", { httpStatusCode: 400, retryable: false });
export const IncompleteSignature = defineErrorClass("IncompleteSignature", { httpStatusCode: 400, retryable: false });

// Rate limiting errors
export const ProvisionedThroughputExceededException = defineErrorClass("ProvisionedThroughputExceededException", { httpStatusCode: 400, retryable: true });
export const ThrottlingException = defineErrorClass("ThrottlingException", { httpStatusCode: 400, retryable: true });
export const RequestLimitExceeded = defineErrorClass("RequestLimitExceeded", { httpStatusCode: 400, retryable: true });

// Replication errors
export const ReplicatedWriteConflictException = defineErrorClass("ReplicatedWriteConflictException", { httpStatusCode: 400, retryable: false });

// Server errors (5xx)
export const InternalServerError = defineErrorClass("InternalServerError", { httpStatusCode: 500, retryable: true });
export const ServiceUnavailable = defineErrorClass("ServiceUnavailable", { httpStatusCode: 503, retryable: true });
export const InternalFailure = defineErrorClass("InternalFailure", { httpStatusCode: 500, retryable: true });

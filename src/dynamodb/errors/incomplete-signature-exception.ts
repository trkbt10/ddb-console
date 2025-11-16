/**
 * @file IncompleteSignatureException error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "IncompleteSignatureException" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: false,
});

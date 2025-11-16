/**
 * @file IncompleteSignature error definition (Common AWS error)
 */

import { defineError } from "./types";

export const ERROR_NAME = "IncompleteSignature" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: false,
});

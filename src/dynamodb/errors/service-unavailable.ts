/**
 * @file ServiceUnavailable error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "ServiceUnavailable" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 503,
  retryable: true,
});

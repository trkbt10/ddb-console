/**
 * @file InternalFailure error definition (Common AWS error)
 */

import { defineError } from "./types";

export const ERROR_NAME = "InternalFailure" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 500,
  retryable: true,
});

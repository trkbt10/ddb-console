/**
 * @file NotAuthorized error definition (Common AWS error)
 */

import { defineError } from "./types";

export const ERROR_NAME = "NotAuthorized" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: false,
});

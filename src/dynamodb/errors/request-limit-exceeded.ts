/**
 * @file RequestLimitExceeded error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "RequestLimitExceeded" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: true,
});

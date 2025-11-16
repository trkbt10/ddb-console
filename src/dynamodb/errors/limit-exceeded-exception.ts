/**
 * @file LimitExceededException error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "LimitExceededException" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: true,
});

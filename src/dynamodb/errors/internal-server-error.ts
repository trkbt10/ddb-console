/**
 * @file InternalServerError error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "InternalServerError" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 500,
  retryable: true,
});

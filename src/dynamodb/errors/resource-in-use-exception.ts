/**
 * @file ResourceInUseException error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "ResourceInUseException" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: false,
});

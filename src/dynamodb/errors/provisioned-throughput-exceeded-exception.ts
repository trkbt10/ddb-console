/**
 * @file ProvisionedThroughputExceededException error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "ProvisionedThroughputExceededException" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: true,
});

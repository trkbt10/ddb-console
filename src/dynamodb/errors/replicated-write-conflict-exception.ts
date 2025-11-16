/**
 * @file ReplicatedWriteConflictException error definition
 */

import { defineError } from "./types";

export const ERROR_NAME = "ReplicatedWriteConflictException" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: true,
});

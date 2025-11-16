/**
 * @file InvalidAction error definition (Common AWS error)
 */

import { defineError } from "./types";

export const ERROR_NAME = "InvalidAction" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 400,
  retryable: false,
});

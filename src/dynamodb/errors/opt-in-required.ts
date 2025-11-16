/**
 * @file OptInRequired error definition (Common AWS error)
 */

import { defineError } from "./types";

export const ERROR_NAME = "OptInRequired" as const;

export default defineError(ERROR_NAME, {
  httpStatusCode: 403,
  retryable: false,
});

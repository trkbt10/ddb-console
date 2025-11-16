/**
 * @file DeleteResourcePolicy command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DeleteResourcePolicy" as const;

export type DeleteResourcePolicyInput = {
  ResourceArn: string;
  ExpectedRevisionId?: string;
};

export type DeleteResourcePolicyOutput = {
  RevisionId?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput
>(COMMAND_NAME);

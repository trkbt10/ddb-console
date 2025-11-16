/**
 * @file GetResourcePolicy command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "GetResourcePolicy" as const;

export type GetResourcePolicyInput = {
  ResourceArn: string;
};

export type GetResourcePolicyOutput = {
  Policy?: string;
  RevisionId?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  GetResourcePolicyInput,
  GetResourcePolicyOutput
>(COMMAND_NAME);

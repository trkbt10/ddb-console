/**
 * @file PutResourcePolicy command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "PutResourcePolicy" as const;

export type PutResourcePolicyInput = {
  ResourceArn: string;
  Policy: string;
  ExpectedRevisionId?: string;
  ConfirmRemoveSelfResourceAccess?: boolean;
};

export type PutResourcePolicyOutput = {
  RevisionId?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  PutResourcePolicyInput,
  PutResourcePolicyOutput
>(COMMAND_NAME);

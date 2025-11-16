/**
 * @file UntagResource command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UntagResource" as const;

export type UntagResourceInput = {
  ResourceArn: string;
  TagKeys: string[];
};

export type UntagResourceOutput = Record<string, never>;

export default defineCommand<
  typeof COMMAND_NAME,
  UntagResourceInput,
  UntagResourceOutput
>(COMMAND_NAME);

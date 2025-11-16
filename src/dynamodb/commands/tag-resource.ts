/**
 * @file TagResource command type definitions
 */

import type { Tag } from "../context/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "TagResource" as const;

export type TagResourceInput = {
  ResourceArn: string;
  Tags: Tag[];
};

export type TagResourceOutput = Record<string, never>;

export default defineCommand<
  typeof COMMAND_NAME,
  TagResourceInput,
  TagResourceOutput
>(COMMAND_NAME);

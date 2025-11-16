/**
 * @file ListTagsOfResource command type definitions
 */

import type { Tag } from "../context/table";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ListTagsOfResource" as const;

export type ListTagsOfResourceInput = {
  ResourceArn: string;
  NextToken?: string;
};

export type ListTagsOfResourceOutput = {
  Tags?: Tag[];
  NextToken?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListTagsOfResourceInput,
  ListTagsOfResourceOutput
>(COMMAND_NAME);

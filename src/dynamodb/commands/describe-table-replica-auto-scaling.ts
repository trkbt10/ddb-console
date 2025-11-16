/**
 * @file DescribeTableReplicaAutoScaling command type definitions
 */

import type { TableAutoScalingDescription } from "../domains/auto-scaling";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeTableReplicaAutoScaling" as const;

export type DescribeTableReplicaAutoScalingInput = {
  TableName: string;
};

export type DescribeTableReplicaAutoScalingOutput = {
  TableAutoScalingDescription?: TableAutoScalingDescription;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeTableReplicaAutoScalingInput,
  DescribeTableReplicaAutoScalingOutput
>(COMMAND_NAME);

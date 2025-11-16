/**
 * @file DescribeEndpoints command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeEndpoints" as const;

export type DescribeEndpointsInput = Record<string, never>;

export type Endpoint = {
  Address: string;
  CachePeriodInMinutes: number;
};

export type DescribeEndpointsOutput = {
  Endpoints: Endpoint[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeEndpointsInput,
  DescribeEndpointsOutput
>(COMMAND_NAME);

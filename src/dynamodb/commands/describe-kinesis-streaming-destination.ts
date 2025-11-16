/**
 * @file DescribeKinesisStreamingDestination command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeKinesisStreamingDestination" as const;

export type DescribeKinesisStreamingDestinationInput = {
  TableName: string;
};

export type KinesisDataStreamDestination = {
  StreamArn?: string;
  DestinationStatus?: "ENABLING" | "ACTIVE" | "DISABLING" | "DISABLED" | "ENABLE_FAILED" | "UPDATING";
  DestinationStatusDescription?: string;
  ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
};

export type DescribeKinesisStreamingDestinationOutput = {
  TableName?: string;
  KinesisDataStreamDestinations?: KinesisDataStreamDestination[];
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeKinesisStreamingDestinationInput,
  DescribeKinesisStreamingDestinationOutput
>(COMMAND_NAME);

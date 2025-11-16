/**
 * @file DescribeKinesisStreamingDestination command type definitions
 */

import type { DestinationStatus, EnableKinesisStreamingConfiguration } from "../domains/kinesis-streaming";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeKinesisStreamingDestination" as const;

/**
 * Kinesis data stream destination
 */
export type KinesisDataStreamDestination = {
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  DestinationStatusDescription?: string;
  ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
};

export type DescribeKinesisStreamingDestinationInput = {
  TableName: string;
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

/**
 * @file EnableKinesisStreamingDestination command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "EnableKinesisStreamingDestination" as const;

export type EnableKinesisStreamingDestinationInput = {
  TableName: string;
  StreamArn: string;
  EnableKinesisStreamingConfiguration?: {
    ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
  };
};

export type EnableKinesisStreamingDestinationOutput = {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: "ENABLING" | "ACTIVE" | "DISABLING" | "DISABLED" | "ENABLE_FAILED" | "UPDATING";
  EnableKinesisStreamingConfiguration?: {
    ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
  };
};

export default defineCommand<
  typeof COMMAND_NAME,
  EnableKinesisStreamingDestinationInput,
  EnableKinesisStreamingDestinationOutput
>(COMMAND_NAME);

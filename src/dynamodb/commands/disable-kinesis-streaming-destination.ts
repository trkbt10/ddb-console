/**
 * @file DisableKinesisStreamingDestination command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DisableKinesisStreamingDestination" as const;

export type DisableKinesisStreamingDestinationInput = {
  TableName: string;
  StreamArn: string;
  EnableKinesisStreamingConfiguration?: {
    ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
  };
};

export type DisableKinesisStreamingDestinationOutput = {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: "ENABLING" | "ACTIVE" | "DISABLING" | "DISABLED" | "ENABLE_FAILED" | "UPDATING";
  EnableKinesisStreamingConfiguration?: {
    ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
  };
};

export default defineCommand<
  typeof COMMAND_NAME,
  DisableKinesisStreamingDestinationInput,
  DisableKinesisStreamingDestinationOutput
>(COMMAND_NAME);

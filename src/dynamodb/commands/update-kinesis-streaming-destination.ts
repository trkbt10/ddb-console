/**
 * @file UpdateKinesisStreamingDestination command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateKinesisStreamingDestination" as const;

export type UpdateKinesisStreamingDestinationInput = {
  TableName: string;
  StreamArn: string;
  UpdateKinesisStreamingConfiguration?: {
    ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
  };
};

export type UpdateKinesisStreamingDestinationOutput = {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: "ENABLING" | "ACTIVE" | "DISABLING" | "DISABLED" | "ENABLE_FAILED" | "UPDATING";
  UpdateKinesisStreamingConfiguration?: {
    ApproximateCreationDateTimePrecision?: "MILLISECOND" | "MICROSECOND";
  };
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateKinesisStreamingDestinationInput,
  UpdateKinesisStreamingDestinationOutput
>(COMMAND_NAME);

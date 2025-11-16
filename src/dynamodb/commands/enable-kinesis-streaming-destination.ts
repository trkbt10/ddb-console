/**
 * @file EnableKinesisStreamingDestination command type definitions
 */

import type { DestinationStatus, EnableKinesisStreamingConfiguration } from "../context/kinesis-streaming";
import { defineCommand } from "./types";

export const COMMAND_NAME = "EnableKinesisStreamingDestination" as const;

export type EnableKinesisStreamingDestinationInput = {
  TableName: string;
  StreamArn: string;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
};

export type EnableKinesisStreamingDestinationOutput = {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
};

export default defineCommand<
  typeof COMMAND_NAME,
  EnableKinesisStreamingDestinationInput,
  EnableKinesisStreamingDestinationOutput
>(COMMAND_NAME);

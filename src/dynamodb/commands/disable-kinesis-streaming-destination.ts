/**
 * @file DisableKinesisStreamingDestination command type definitions
 */

import type { DestinationStatus, EnableKinesisStreamingConfiguration } from "../context/kinesis-streaming";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DisableKinesisStreamingDestination" as const;

export type DisableKinesisStreamingDestinationInput = {
  TableName: string;
  StreamArn: string;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
};

export type DisableKinesisStreamingDestinationOutput = {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DisableKinesisStreamingDestinationInput,
  DisableKinesisStreamingDestinationOutput
>(COMMAND_NAME);

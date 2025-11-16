/**
 * @file UpdateKinesisStreamingDestination command type definitions
 */

import type { DestinationStatus, EnableKinesisStreamingConfiguration } from "../context/kinesis-streaming";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateKinesisStreamingDestination" as const;

export type UpdateKinesisStreamingDestinationInput = {
  TableName: string;
  StreamArn: string;
  UpdateKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
};

export type UpdateKinesisStreamingDestinationOutput = {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  UpdateKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateKinesisStreamingDestinationInput,
  UpdateKinesisStreamingDestinationOutput
>(COMMAND_NAME);

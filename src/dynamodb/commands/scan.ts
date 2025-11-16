/**
 * @file Scan command type definitions
 */

import type { AttributeValue, Select } from "../domains/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "Scan" as const;

export type ScanInput = {
  TableName: string;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ExpressionAttributeNames?: Record<string, string>;
  IndexName?: string;
  Limit?: number;
  ExclusiveStartKey?: Record<string, AttributeValue>;
  FilterExpression?: string;
  ProjectionExpression?: string;
  Select?: Select;
  ConsistentRead?: boolean;
  Segment?: number;
  TotalSegments?: number;
};

export type ScanOutput = {
  Items?: Array<Record<string, AttributeValue>>;
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: Record<string, AttributeValue>;
  ConsumedCapacity?: unknown;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ScanInput,
  ScanOutput
>(COMMAND_NAME);

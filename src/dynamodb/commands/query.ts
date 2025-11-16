/**
 * @file Query command type definitions
 */

import type { AttributeValue, Select } from "../context/record-item";
import { defineCommand } from "./types";

export const COMMAND_NAME = "Query" as const;

export type QueryInput = {
  TableName: string;
  KeyConditionExpression: string;
  ExpressionAttributeValues: Record<string, AttributeValue>;
  ExpressionAttributeNames?: Record<string, string>;
  IndexName?: string;
  Limit?: number;
  ScanIndexForward?: boolean;
  ExclusiveStartKey?: Record<string, AttributeValue>;
  FilterExpression?: string;
  ProjectionExpression?: string;
  Select?: Select;
  ConsistentRead?: boolean;
};

export type QueryOutput = {
  Items?: Array<Record<string, AttributeValue>>;
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: Record<string, AttributeValue>;
  ConsumedCapacity?: unknown;
};

export default defineCommand<
  typeof COMMAND_NAME,
  QueryInput,
  QueryOutput
>(COMMAND_NAME);

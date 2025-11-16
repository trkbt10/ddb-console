/**
 * @file DescribeContributorInsights command type definitions
 */

import type { ContributorInsightsStatus } from "../context/contributor-insights";
import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeContributorInsights" as const;

/**
 * Failure exception
 */
export type FailureException = {
  ExceptionName?: string;
  ExceptionDescription?: string;
};

export type DescribeContributorInsightsInput = {
  TableName: string;
  IndexName?: string;
};

export type DescribeContributorInsightsOutput = {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsRuleList?: string[];
  ContributorInsightsStatus?: ContributorInsightsStatus;
  LastUpdateDateTime?: number;
  FailureException?: FailureException;
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeContributorInsightsInput,
  DescribeContributorInsightsOutput
>(COMMAND_NAME);

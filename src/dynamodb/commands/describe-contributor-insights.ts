/**
 * @file DescribeContributorInsights command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "DescribeContributorInsights" as const;

export type DescribeContributorInsightsInput = {
  TableName: string;
  IndexName?: string;
};

export type DescribeContributorInsightsOutput = {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsRuleList?: string[];
  ContributorInsightsStatus?: "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | "FAILED";
  LastUpdateDateTime?: number;
  FailureException?: {
    ExceptionName?: string;
    ExceptionDescription?: string;
  };
};

export default defineCommand<
  typeof COMMAND_NAME,
  DescribeContributorInsightsInput,
  DescribeContributorInsightsOutput
>(COMMAND_NAME);

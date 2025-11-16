/**
 * @file ListContributorInsights command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "ListContributorInsights" as const;

export type ListContributorInsightsInput = {
  TableName?: string;
  NextToken?: string;
  MaxResults?: number;
};

export type ContributorInsightsSummary = {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | "FAILED";
};

export type ListContributorInsightsOutput = {
  ContributorInsightsSummaries?: ContributorInsightsSummary[];
  NextToken?: string;
};

export default defineCommand<
  typeof COMMAND_NAME,
  ListContributorInsightsInput,
  ListContributorInsightsOutput
>(COMMAND_NAME);

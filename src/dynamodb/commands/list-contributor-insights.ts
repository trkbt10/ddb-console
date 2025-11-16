/**
 * @file ListContributorInsights command type definitions
 */

import type { ContributorInsightsStatus } from "../domains/contributor-insights";
import { defineCommand } from "./types";

export const COMMAND_NAME = "ListContributorInsights" as const;

/**
 * Contributor insights summary
 */
export type ContributorInsightsSummary = {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: ContributorInsightsStatus;
};

export type ListContributorInsightsInput = {
  TableName?: string;
  NextToken?: string;
  MaxResults?: number;
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

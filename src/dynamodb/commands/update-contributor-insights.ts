/**
 * @file UpdateContributorInsights command type definitions
 */

import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateContributorInsights" as const;

export type UpdateContributorInsightsInput = {
  TableName: string;
  IndexName?: string;
  ContributorInsightsAction: "ENABLE" | "DISABLE";
};

export type UpdateContributorInsightsOutput = {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: "ENABLING" | "ENABLED" | "DISABLING" | "DISABLED" | "FAILED";
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateContributorInsightsInput,
  UpdateContributorInsightsOutput
>(COMMAND_NAME);

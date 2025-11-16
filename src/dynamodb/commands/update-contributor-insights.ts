/**
 * @file UpdateContributorInsights command type definitions
 */

import type { ContributorInsightsStatus } from "../domains/contributor-insights";
import { defineCommand } from "./types";

export const COMMAND_NAME = "UpdateContributorInsights" as const;

/**
 * Contributor insights action
 */
export type ContributorInsightsAction = "ENABLE" | "DISABLE";

export type UpdateContributorInsightsInput = {
  TableName: string;
  IndexName?: string;
  ContributorInsightsAction: ContributorInsightsAction;
};

export type UpdateContributorInsightsOutput = {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: ContributorInsightsStatus;
};

export default defineCommand<
  typeof COMMAND_NAME,
  UpdateContributorInsightsInput,
  UpdateContributorInsightsOutput
>(COMMAND_NAME);

/**
 * @file DynamoDB Contributor Insights Domain Types
 * Type definitions for contributor insights entities
 */

/**
 * Contributor insights status
 */
export type ContributorInsightsStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "FAILED";

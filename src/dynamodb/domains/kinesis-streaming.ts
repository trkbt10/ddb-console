/**
 * @file DynamoDB Kinesis Streaming Domain Types
 * Type definitions for Kinesis streaming destination entities
 */

/**
 * Destination status
 */
export type DestinationStatus =
  | "ENABLING"
  | "ACTIVE"
  | "DISABLING"
  | "DISABLED"
  | "ENABLE_FAILED"
  | "UPDATING";

/**
 * Approximate creation date time precision
 */
export type ApproximateCreationDateTimePrecision = "MILLISECOND" | "MICROSECOND";

/**
 * Enable Kinesis streaming configuration
 */
export type EnableKinesisStreamingConfiguration = {
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
};

/**
 * @file Load configuration from environment variables (Node.js dependent)
 */

// AWS credentials
export type AWSCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
};

/**
 * Get AWS credentials from environment variables
 */
export const getCredentialsFromEnv = (): AWSCredentials => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const sessionToken = process.env.AWS_SESSION_TOKEN;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set",
    );
  }

  return {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  };
};

/**
 * Get DynamoDB endpoint from environment variables
 */
export const getEndpointFromEnv = (): string | undefined => {
  return process.env.DYNAMODB_ENDPOINT;
};

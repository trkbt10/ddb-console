/**
 * @file AWS Signature Version 4 signing utility using WebCrypto
 */

import type { AWSCredentials } from "../config";

// Date information
export type AmzDates = {
  dateStamp: string;
  amzDate: string;
};

// AWS signature configuration
export type SignerConfig = {
  region: string;
  service: string;
  credentials: AWSCredentials;
};

// Signed request
export type SignedRequest = {
  headers: Record<string, string>;
  body: string;
};

// =====================
// WebCrypto signing utilities
// =====================

/**
 * Join array elements with newlines
 */
const joinLines = (...lines: string[]): string => lines.join("\n");

/**
 * Calculate SHA-256 hash and return as hex string
 */
const sha256Hex = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return bufferToHex(hashBuffer);
};

/**
 * Calculate HMAC-SHA256 and return as ArrayBuffer
 */
const hmac = async (
  key: ArrayBuffer | string,
  data: string,
): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  const keyBuffer = typeof key === "string" ? encoder.encode(key) : key;

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  return await crypto.subtle.sign("HMAC", cryptoKey, dataBuffer);
};

/**
 * Calculate HMAC-SHA256 and return as hex string
 */
const hmacHex = async (
  key: ArrayBuffer | string,
  data: string,
): Promise<string> => {
  const result = await hmac(key, data);
  return bufferToHex(result);
};

/**
 * Convert ArrayBuffer to hex string
 */
const bufferToHex = (buffer: ArrayBuffer): string => {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Generate UTC date information
 */
export const getAmzDates = (date = new Date()): AmzDates => {
  const YYYY = date.getUTCFullYear().toString();
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const DD = String(date.getUTCDate()).padStart(2, "0");

  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");

  const dateStamp = `${YYYY}${MM}${DD}`;
  const amzDate = `${dateStamp}T${hh}${mm}${ss}Z`;

  return { dateStamp, amzDate };
};

/**
 * Generate AWS Signature Version 4 signing key
 */
const getSigningKey = async (
  config: SignerConfig,
  dateStamp: string,
): Promise<ArrayBuffer> => {
  const kDate = await hmac(`AWS4${config.credentials.secretAccessKey}`, dateStamp);
  const kRegion = await hmac(kDate, config.region);
  const kService = await hmac(kRegion, config.service);
  const kSigning = await hmac(kService, "aws4_request");
  return kSigning;
};

/**
 * Sign DynamoDB request with SigV4 signature
 */
export const signDynamoRequest = async (
  config: SignerConfig,
  body: string,
  target: string,
  host: string,
  now = new Date(),
): Promise<SignedRequest> => {
  const { dateStamp, amzDate } = getAmzDates(now);

  const method = "POST";
  const canonicalUri = "/";
  const canonicalQueryString = "";

  const contentType = "application/x-amz-json-1.0";

  const canonicalHeaders = joinLines(
    `content-type:${contentType}`,
    `host:${host}`,
    `x-amz-date:${amzDate}`,
    `x-amz-target:${target}`,
    "",
  );

  const signedHeaders = "content-type;host;x-amz-date;x-amz-target";

  const payloadHash = await sha256Hex(body);

  const canonicalRequest = joinLines(
    method,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  );

  const algorithm = "AWS4-HMAC-SHA256";
  const credentialScope = `${dateStamp}/${config.region}/${config.service}/aws4_request`;
  const stringToSign = joinLines(
    algorithm,
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  );

  const signingKey = await getSigningKey(config, dateStamp);
  const signature = await hmacHex(signingKey, stringToSign);

  const authorizationHeader = [
    algorithm,
    Object.entries({
      Credential: `${config.credentials.accessKeyId}/${credentialScope}`,
      SignedHeaders: signedHeaders,
      Signature: signature,
    })
      .map(([k, v]) => `${k}=${v}`)
      .join(", "),
  ].join(" ");

  const headers: Record<string, string> = {
    "Content-Type": contentType,
    "X-Amz-Date": amzDate,
    "X-Amz-Target": target,
    Authorization: authorizationHeader,
  };

  if (config.credentials.sessionToken) {
    headers["X-Amz-Security-Token"] = config.credentials.sessionToken;
  }

  return { headers, body };
};

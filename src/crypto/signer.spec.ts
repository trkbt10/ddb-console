/**
 * @file Tests for WebCrypto signing utility
 */

import { getAmzDates, signDynamoRequest } from "./signer";
import type { SignerConfig } from "./signer";

describe("getAmzDates", () => {
  it("returns date string in correct format", () => {
    const date = new Date("2025-11-16T10:45:12Z");
    const result = getAmzDates(date);

    expect(result.dateStamp).toBe("20251116");
    expect(result.amzDate).toBe("20251116T104512Z");
  });

  it("works with default current time", () => {
    const result = getAmzDates();

    expect(result.dateStamp).toMatch(/^\d{8}$/);
    expect(result.amzDate).toMatch(/^\d{8}T\d{6}Z$/);
  });
});

describe("signDynamoRequest", () => {
  it("generates signed request", async () => {
    const config: SignerConfig = {
      region: "ap-northeast-1",
      service: "dynamodb",
      credentials: {
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
    };

    const body = JSON.stringify({ TableName: "TestTable" });
    const target = "DynamoDB_20120810.Query";
    const host = "dynamodb.ap-northeast-1.amazonaws.com";
    const date = new Date("2025-11-16T10:45:12Z");

    const result = await signDynamoRequest(config, body, target, host, date);

    expect(result.headers).toHaveProperty("Authorization");
    expect(result.headers).toHaveProperty("X-Amz-Date");
    expect(result.headers).toHaveProperty("X-Amz-Target");
    expect(result.headers).toHaveProperty("Content-Type");
    expect(result.headers["X-Amz-Date"]).toBe("20251116T104512Z");
    expect(result.headers["X-Amz-Target"]).toBe(target);
    expect(result.headers["Content-Type"]).toBe("application/x-amz-json-1.0");
    expect(result.body).toBe(body);
  });

  it("includes session token in headers when present", async () => {
    const config: SignerConfig = {
      region: "ap-northeast-1",
      service: "dynamodb",
      credentials: {
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        sessionToken: "SESSION_TOKEN_EXAMPLE",
      },
    };

    const body = JSON.stringify({ TableName: "TestTable" });
    const target = "DynamoDB_20120810.Query";
    const host = "dynamodb.ap-northeast-1.amazonaws.com";

    const result = await signDynamoRequest(config, body, target, host);

    expect(result.headers).toHaveProperty("X-Amz-Security-Token");
    expect(result.headers["X-Amz-Security-Token"]).toBe(
      "SESSION_TOKEN_EXAMPLE",
    );
  });

  it("Authorization header has correct format", async () => {
    const config: SignerConfig = {
      region: "us-east-1",
      service: "dynamodb",
      credentials: {
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      },
    };

    const body = JSON.stringify({ TableName: "TestTable" });
    const target = "DynamoDB_20120810.Query";
    const host = "dynamodb.us-east-1.amazonaws.com";

    const result = await signDynamoRequest(config, body, target, host);

    expect(result.headers.Authorization).toMatch(/^AWS4-HMAC-SHA256 /);
    expect(result.headers.Authorization).toContain("Credential=");
    expect(result.headers.Authorization).toContain("SignedHeaders=");
    expect(result.headers.Authorization).toContain("Signature=");
  });
});

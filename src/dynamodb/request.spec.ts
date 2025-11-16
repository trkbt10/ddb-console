/**
 * @file Tests for DynamoDB request abstraction layer
 */

import { executeDynamoCommand } from "./request";

describe("request module", () => {
  it("executeDynamoCommand function is exported", () => {
    expect(typeof executeDynamoCommand).toBe("function");
  });
});

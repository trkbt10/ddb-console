/**
 * @file Tests for unmarshall functions
 */

import type { AttributeValue } from "../domains/record-item";
import { unmarshall, unmarshallItem } from "./unmarshall";

describe("unmarshall", () => {
  describe("primitive types", () => {
    it("should convert NULL to null", () => {
      expect(unmarshall({ NULL: true })).toBe(null);
    });

    it("should convert BOOL to boolean", () => {
      expect(unmarshall({ BOOL: true })).toBe(true);
      expect(unmarshall({ BOOL: false })).toBe(false);
    });

    it("should convert S to string", () => {
      expect(unmarshall({ S: "hello" })).toBe("hello");
      expect(unmarshall({ S: "" })).toBe("");
    });

    it("should convert N to number", () => {
      expect(unmarshall({ N: "42" })).toBe(42);
      expect(unmarshall({ N: "0" })).toBe(0);
      expect(unmarshall({ N: "-10.5" })).toBe(-10.5);
    });
  });

  describe("set types", () => {
    it("should convert SS to string array", () => {
      expect(unmarshall({ SS: ["a", "b", "c"] })).toEqual(["a", "b", "c"]);
    });

    it("should convert NS to number array", () => {
      expect(unmarshall({ NS: ["1", "2", "3"] })).toEqual([1, 2, 3]);
    });

    it("should convert BS to string array", () => {
      expect(unmarshall({ BS: ["base64data1", "base64data2"] })).toEqual([
        "base64data1",
        "base64data2",
      ]);
    });
  });

  describe("list types", () => {
    it("should convert empty L to empty array", () => {
      expect(unmarshall({ L: [] })).toEqual([]);
    });

    it("should convert L with mixed types to array", () => {
      expect(
        unmarshall({
          L: [{ N: "1" }, { S: "two" }, { BOOL: true }],
        }),
      ).toEqual([1, "two", true]);
    });

    it("should convert nested L to nested array", () => {
      expect(
        unmarshall({
          L: [
            { L: [{ N: "1" }, { N: "2" }] },
            { L: [{ N: "3" }, { N: "4" }] },
          ],
        }),
      ).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });
  });

  describe("map types", () => {
    it("should convert empty M to empty object", () => {
      expect(unmarshall({ M: {} })).toEqual({});
    });

    it("should convert simple M to object", () => {
      expect(
        unmarshall({
          M: {
            name: { S: "Alice" },
            age: { N: "30" },
          },
        }),
      ).toEqual({
        name: "Alice",
        age: 30,
      });
    });

    it("should convert nested M to nested object", () => {
      expect(
        unmarshall({
          M: {
            user: {
              M: {
                name: { S: "Bob" },
                active: { BOOL: true },
              },
            },
          },
        }),
      ).toEqual({
        user: {
          name: "Bob",
          active: true,
        },
      });
    });

    it("should convert M with array to object with array", () => {
      expect(
        unmarshall({
          M: {
            tags: { SS: ["a", "b"] },
          },
        }),
      ).toEqual({
        tags: ["a", "b"],
      });
    });
  });

  describe("complex types", () => {
    it("should handle deeply nested structures", () => {
      const input: AttributeValue = {
        M: {
          id: { N: "1" },
          user: {
            M: {
              name: { S: "Charlie" },
              emails: { SS: ["charlie@example.com", "charlie2@example.com"] },
              metadata: {
                M: {
                  verified: { BOOL: true },
                  score: { N: "95.5" },
                },
              },
            },
          },
          tags: { SS: ["important", "verified"] },
        },
      };

      expect(unmarshall(input)).toEqual({
        id: 1,
        user: {
          name: "Charlie",
          emails: ["charlie@example.com", "charlie2@example.com"],
          metadata: {
            verified: true,
            score: 95.5,
          },
        },
        tags: ["important", "verified"],
      });
    });

    it("should handle 5-level deep nested objects", () => {
      const input: AttributeValue = {
        M: {
          level1: {
            M: {
              level2: {
                M: {
                  level3: {
                    M: {
                      level4: {
                        M: {
                          level5: {
                            M: {
                              value: { S: "deep" },
                              count: { N: "42" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(unmarshall(input)).toEqual({
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  value: "deep",
                  count: 42,
                },
              },
            },
          },
        },
      });
    });

    it("should handle arrays of nested objects", () => {
      const input: AttributeValue = {
        L: [
          {
            M: {
              id: { N: "1" },
              data: {
                M: {
                  name: { S: "first" },
                  active: { BOOL: true },
                },
              },
            },
          },
          {
            M: {
              id: { N: "2" },
              data: {
                M: {
                  name: { S: "second" },
                  active: { BOOL: false },
                },
              },
            },
          },
        ],
      };

      expect(unmarshall(input)).toEqual([
        {
          id: 1,
          data: { name: "first", active: true },
        },
        {
          id: 2,
          data: { name: "second", active: false },
        },
      ]);
    });

    it("should handle nested arrays of different types", () => {
      const input: AttributeValue = {
        M: {
          stringArrays: {
            L: [{ SS: ["a", "b"] }, { SS: ["c", "d"] }],
          },
          numberArrays: {
            L: [{ NS: ["1", "2"] }, { NS: ["3", "4"] }],
          },
          mixedArrays: {
            L: [
              { L: [{ N: "1" }, { S: "two" }] },
              { L: [{ BOOL: true }, { NULL: true }] },
            ],
          },
        },
      };

      expect(unmarshall(input)).toEqual({
        stringArrays: [["a", "b"], ["c", "d"]],
        numberArrays: [[1, 2], [3, 4]],
        mixedArrays: [[1, "two"], [true, null]],
      });
    });

    it("should handle objects with nested arrays containing objects", () => {
      const input: AttributeValue = {
        M: {
          users: {
            L: [
              {
                M: {
                  name: { S: "Alice" },
                  permissions: { SS: ["read", "write"] },
                  metadata: {
                    M: {
                      role: { S: "admin" },
                    },
                  },
                },
              },
              {
                M: {
                  name: { S: "Bob" },
                  permissions: { SS: ["read"] },
                  metadata: {
                    M: {
                      role: { S: "user" },
                    },
                  },
                },
              },
            ],
          },
        },
      };

      expect(unmarshall(input)).toEqual({
        users: [
          {
            name: "Alice",
            permissions: ["read", "write"],
            metadata: { role: "admin" },
          },
          {
            name: "Bob",
            permissions: ["read"],
            metadata: { role: "user" },
          },
        ],
      });
    });

    it("should handle deeply nested mixed structures", () => {
      const input: AttributeValue = {
        M: {
          company: {
            M: {
              name: { S: "TechCorp" },
              departments: {
                L: [
                  {
                    M: {
                      name: { S: "Engineering" },
                      teams: {
                        L: [
                          {
                            M: {
                              name: { S: "Backend" },
                              members: {
                                L: [
                                  {
                                    M: {
                                      id: { N: "1" },
                                      name: { S: "Alice" },
                                      skills: { SS: ["Node.js", "Python"] },
                                    },
                                  },
                                  {
                                    M: {
                                      id: { N: "2" },
                                      name: { S: "Bob" },
                                      skills: { SS: ["Go", "Rust"] },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                          {
                            M: {
                              name: { S: "Frontend" },
                              members: {
                                L: [
                                  {
                                    M: {
                                      id: { N: "3" },
                                      name: { S: "Charlie" },
                                      skills: { SS: ["React", "Vue"] },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
              metadata: {
                M: {
                  founded: { N: "2020" },
                  active: { BOOL: true },
                  stats: {
                    M: {
                      employees: { N: "100" },
                      revenue: { N: "1000000.5" },
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(unmarshall(input)).toEqual({
        company: {
          name: "TechCorp",
          departments: [
            {
              name: "Engineering",
              teams: [
                {
                  name: "Backend",
                  members: [
                    { id: 1, name: "Alice", skills: ["Node.js", "Python"] },
                    { id: 2, name: "Bob", skills: ["Go", "Rust"] },
                  ],
                },
                {
                  name: "Frontend",
                  members: [
                    { id: 3, name: "Charlie", skills: ["React", "Vue"] },
                  ],
                },
              ],
            },
          ],
          metadata: {
            founded: 2020,
            active: true,
            stats: {
              employees: 100,
              revenue: 1000000.5,
            },
          },
        },
      });
    });

    it("should handle empty nested structures", () => {
      const input: AttributeValue = {
        M: {
          emptyObject: { M: {} },
          emptyArray: { L: [] },
          nestedEmpty: {
            M: {
              obj: { M: {} },
              arr: { L: [] },
            },
          },
          arrayWithEmpty: {
            L: [{ M: {} }, { L: [] }],
          },
        },
      };

      expect(unmarshall(input)).toEqual({
        emptyObject: {},
        emptyArray: [],
        nestedEmpty: {
          obj: {},
          arr: [],
        },
        arrayWithEmpty: [{}, []],
      });
    });

    it("should handle arrays containing null and nested structures", () => {
      const input: AttributeValue = {
        L: [
          { NULL: true },
          { M: { name: { S: "test" } } },
          { NS: ["1", "2"] },
          { SS: ["a", "b"] },
          { NULL: true },
        ],
      };

      expect(unmarshall(input)).toEqual([
        null,
        { name: "test" },
        [1, 2],
        ["a", "b"],
        null,
      ]);
    });
  });

});

describe("unmarshallItem", () => {
  it("should convert DynamoDB Item to JavaScript object", () => {
    const input: Record<string, AttributeValue> = {
      id: { N: "123" },
      name: { S: "Test" },
      active: { BOOL: true },
    };

    expect(unmarshallItem(input)).toEqual({
      id: 123,
      name: "Test",
      active: true,
    });
  });

  it("should handle empty item", () => {
    expect(unmarshallItem({})).toEqual({});
  });

  it("should handle nested objects", () => {
    const input: Record<string, AttributeValue> = {
      user: {
        M: {
          name: { S: "Alice" },
          age: { N: "30" },
        },
      },
      tags: { SS: ["a", "b"] },
    };

    expect(unmarshallItem(input)).toEqual({
      user: {
        name: "Alice",
        age: 30,
      },
      tags: ["a", "b"],
    });
  });
});

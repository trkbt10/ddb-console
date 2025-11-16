/**
 * @file Tests for marshall functions
 */

import { marshall, marshallObject } from "./marshall";

describe("marshall", () => {
  describe("primitive types", () => {
    it("should convert null to NULL", () => {
      expect(marshall(null)).toEqual({ NULL: true });
    });

    it("should convert undefined to NULL", () => {
      expect(marshall(undefined)).toEqual({ NULL: true });
    });

    it("should convert boolean to BOOL", () => {
      expect(marshall(true)).toEqual({ BOOL: true });
      expect(marshall(false)).toEqual({ BOOL: false });
    });

    it("should convert string to S", () => {
      expect(marshall("hello")).toEqual({ S: "hello" });
      expect(marshall("")).toEqual({ S: "" });
    });

    it("should convert number to N", () => {
      expect(marshall(42)).toEqual({ N: "42" });
      expect(marshall(0)).toEqual({ N: "0" });
      expect(marshall(-10.5)).toEqual({ N: "-10.5" });
    });
  });

  describe("array types", () => {
    it("should convert empty array to L", () => {
      expect(marshall([])).toEqual({ L: [] });
    });

    it("should convert string array to SS", () => {
      expect(marshall(["a", "b", "c"])).toEqual({ SS: ["a", "b", "c"] });
    });

    it("should convert number array to NS", () => {
      expect(marshall([1, 2, 3])).toEqual({ NS: ["1", "2", "3"] });
    });

    it("should convert mixed array to L", () => {
      expect(marshall([1, "two", true])).toEqual({
        L: [{ N: "1" }, { S: "two" }, { BOOL: true }],
      });
    });

    it("should convert nested array to L", () => {
      // Note: Arrays of only numbers become NS (Number Set), not L
      expect(marshall([[1, 2], [3, 4]])).toEqual({
        L: [{ NS: ["1", "2"] }, { NS: ["3", "4"] }],
      });
    });
  });

  describe("object types", () => {
    it("should convert empty object to M", () => {
      expect(marshall({})).toEqual({ M: {} });
    });

    it("should convert simple object to M", () => {
      expect(marshall({ name: "Alice", age: 30 })).toEqual({
        M: {
          name: { S: "Alice" },
          age: { N: "30" },
        },
      });
    });

    it("should convert nested object to M", () => {
      expect(
        marshall({
          user: {
            name: "Bob",
            active: true,
          },
        }),
      ).toEqual({
        M: {
          user: {
            M: {
              name: { S: "Bob" },
              active: { BOOL: true },
            },
          },
        },
      });
    });

    it("should convert object with array to M", () => {
      expect(marshall({ tags: ["a", "b"] })).toEqual({
        M: {
          tags: { SS: ["a", "b"] },
        },
      });
    });
  });

  describe("complex types", () => {
    it("should handle deeply nested structures", () => {
      const input = {
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
      };

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle 5-level deep nested objects", () => {
      const input = {
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
      };

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle arrays of nested objects", () => {
      const input = [
        {
          id: 1,
          data: { name: "first", active: true },
        },
        {
          id: 2,
          data: { name: "second", active: false },
        },
      ];

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle nested arrays of different types", () => {
      const input = {
        stringArrays: [["a", "b"], ["c", "d"]],
        numberArrays: [[1, 2], [3, 4]],
        mixedArrays: [[1, "two"], [true, null]],
      };

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle objects with nested arrays containing objects", () => {
      const input = {
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
      };

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle deeply nested mixed structures", () => {
      const input = {
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
      };

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle empty nested structures", () => {
      const input = {
        emptyObject: {},
        emptyArray: [],
        nestedEmpty: {
          obj: {},
          arr: [],
        },
        arrayWithEmpty: [{}, []],
      };

      expect(marshall(input)).toEqual({
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
      });
    });

    it("should handle arrays containing null and nested structures", () => {
      const input = [
        null,
        { name: "test" },
        [1, 2],
        ["a", "b"],
        null,
      ];

      expect(marshall(input)).toEqual({
        L: [
          { NULL: true },
          { M: { name: { S: "test" } } },
          { NS: ["1", "2"] },
          { SS: ["a", "b"] },
          { NULL: true },
        ],
      });
    });
  });

  describe("error cases", () => {
    it("should throw error for unsupported types", () => {
      expect(() => marshall(Symbol("test"))).toThrow("Unsupported type");
      expect(() => marshall(() => {})).toThrow("Unsupported type");
    });
  });
});

describe("marshallObject", () => {
  it("should convert object properties to AttributeValues", () => {
    const input = {
      id: 123,
      name: "Test",
      active: true,
    };

    expect(marshallObject(input)).toEqual({
      id: { N: "123" },
      name: { S: "Test" },
      active: { BOOL: true },
    });
  });

  it("should handle empty object", () => {
    expect(marshallObject({})).toEqual({});
  });

  it("should handle nested objects", () => {
    const input = {
      user: {
        name: "Alice",
        age: 30,
      },
      tags: ["a", "b"],
    };

    expect(marshallObject(input)).toEqual({
      user: {
        M: {
          name: { S: "Alice" },
          age: { N: "30" },
        },
      },
      tags: { SS: ["a", "b"] },
    });
  });
});

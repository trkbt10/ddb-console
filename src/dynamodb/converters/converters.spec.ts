/**
 * @file Roundtrip tests for marshall/unmarshall converters
 * These tests ensure that marshall -> unmarshall conversion preserves the original values
 */

import { marshall, marshallObject } from "./marshall";
import { unmarshall, unmarshallItem } from "./unmarshall";

describe("marshall/unmarshall roundtrip", () => {
  describe("primitive types", () => {
    it("should preserve null", () => {
      const original = null;
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toBe(original);
    });

    it("should preserve boolean values", () => {
      const testCases = [true, false];
      for (const original of testCases) {
        const marshalled = marshall(original);
        const unmarshalled = unmarshall(marshalled);
        expect(unmarshalled).toBe(original);
      }
    });

    it("should preserve string values", () => {
      const testCases = ["hello", "", "world with spaces", "日本語"];
      for (const original of testCases) {
        const marshalled = marshall(original);
        const unmarshalled = unmarshall(marshalled);
        expect(unmarshalled).toBe(original);
      }
    });

    it("should preserve number values", () => {
      const testCases = [0, 42, -10, 3.14, -99.99, 1e10, 1e-10];
      for (const original of testCases) {
        const marshalled = marshall(original);
        const unmarshalled = unmarshall(marshalled);
        expect(unmarshalled).toBe(original);
      }
    });
  });

  describe("array types", () => {
    it("should preserve empty array", () => {
      const original: unknown[] = [];
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve string arrays (SS)", () => {
      const original = ["a", "b", "c"];
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve number arrays (NS)", () => {
      const original = [1, 2, 3, 4.5, -10];
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve mixed arrays (L)", () => {
      const original = [1, "two", true, null, 3.14];
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve nested arrays", () => {
      const original = [
        [1, 2],
        [3, 4],
        ["a", "b"],
      ];
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });
  });

  describe("object types", () => {
    it("should preserve empty object", () => {
      const original = {};
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve simple objects", () => {
      const original = {
        name: "Alice",
        age: 30,
        active: true,
      };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve nested objects", () => {
      const original = {
        user: {
          name: "Bob",
          profile: {
            email: "bob@example.com",
            verified: true,
          },
        },
        metadata: {
          version: 1,
        },
      };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve objects with arrays", () => {
      const original = {
        name: "Charlie",
        tags: ["important", "verified"],
        scores: [95, 87, 92],
      };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });
  });

  describe("complex structures", () => {
    it("should preserve deeply nested structures", () => {
      const original = {
        id: 12345,
        user: {
          name: "David",
          emails: ["david@example.com", "david2@example.com"],
          profile: {
            bio: "Software Engineer",
            social: {
              twitter: "@david",
              github: "david",
            },
            verified: true,
            score: 98.5,
          },
          tags: ["developer", "contributor"],
        },
        metadata: {
          created: 1234567890,
          updated: 1234567900,
          flags: [true, false, true],
        },
        items: [
          { id: 1, name: "Item 1" },
          { id: 2, name: "Item 2" },
        ],
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve 5-level deep nested objects", () => {
      const original = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  value: "deep",
                  count: 42,
                  active: true,
                },
              },
            },
          },
        },
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve 7-level deep nested mixed structures", () => {
      const original = {
        a: {
          b: {
            c: [
              {
                d: {
                  e: [
                    {
                      f: {
                        g: "very deep value",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve arrays of objects", () => {
      const original = [
        { id: 1, name: "First", active: true },
        { id: 2, name: "Second", active: false },
        { id: 3, name: "Third", active: true },
      ];

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve nested arrays of different types", () => {
      const original = {
        stringArrays: [["a", "b"], ["c", "d"]],
        numberArrays: [[1, 2], [3, 4]],
        mixedArrays: [[1, "two"], [true, null]],
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve objects with nested arrays containing objects", () => {
      const original = {
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

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve deeply nested mixed structures (company example)", () => {
      const original = {
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

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve empty nested structures", () => {
      const original = {
        emptyObject: {},
        emptyArray: [],
        nestedEmpty: {
          obj: {},
          arr: [],
        },
        arrayWithEmpty: [{}, []],
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve arrays containing null and nested structures", () => {
      const original = [
        null,
        { name: "test" },
        [1, 2],
        ["a", "b"],
        null,
      ];

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve arrays of arrays of arrays", () => {
      const original = [
        [[1, 2], [3, 4]],
        [[5, 6], [7, 8]],
      ];

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve complex e-commerce data structure", () => {
      const original = {
        orderId: "ORD-12345",
        customer: {
          id: "CUST-001",
          name: "John Doe",
          email: "john@example.com",
          addresses: [
            {
              type: "shipping",
              street: "123 Main St",
              city: "Springfield",
              coordinates: { lat: 39.7817, lng: -89.6501 },
            },
            {
              type: "billing",
              street: "456 Oak Ave",
              city: "Shelbyville",
              coordinates: { lat: 39.4064, lng: -88.7907 },
            },
          ],
        },
        items: [
          {
            productId: "PROD-001",
            name: "Widget",
            quantity: 2,
            price: 19.99,
            attributes: {
              color: "blue",
              size: "medium",
              tags: ["popular", "new"],
            },
          },
          {
            productId: "PROD-002",
            name: "Gadget",
            quantity: 1,
            price: 49.99,
            attributes: {
              color: "red",
              size: "large",
              tags: ["premium"],
            },
          },
        ],
        payment: {
          method: "credit_card",
          details: {
            last4: "1234",
            brand: "Visa",
            verified: true,
          },
          installments: [
            { amount: 29.99, dueDate: 1609459200 },
            { amount: 29.99, dueDate: 1612137600 },
            { amount: 29.99, dueDate: 1614556800 },
          ],
        },
        metadata: {
          source: "web",
          campaign: null,
          referrer: "google",
          flags: {
            giftWrap: true,
            expressShipping: false,
            newsletter: true,
          },
        },
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve objects with null values", () => {
      const original = {
        name: "Test",
        description: null,
        count: 0,
        active: false,
      };

      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });
  });

  describe("edge cases", () => {
    it("should preserve empty strings", () => {
      const original = { name: "" };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve zero values", () => {
      const original = { count: 0, score: 0.0 };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve negative numbers", () => {
      const original = { temperature: -10, debt: -99.99 };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });

    it("should preserve large numbers", () => {
      const original = { bigNumber: 1e15, smallNumber: 1e-15 };
      const marshalled = marshall(original);
      const unmarshalled = unmarshall(marshalled);
      expect(unmarshalled).toEqual(original);
    });
  });
});

describe("marshallObject/unmarshallItem roundtrip", () => {
  it("should preserve simple object", () => {
    const original = {
      id: 123,
      name: "Test Item",
      active: true,
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
  });

  it("should preserve complex object", () => {
    const original = {
      userId: 12345,
      profile: {
        name: "Alice",
        email: "alice@example.com",
        age: 30,
      },
      tags: ["user", "premium"],
      scores: [95, 87, 92],
      metadata: {
        created: 1234567890,
        verified: true,
      },
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
  });

  it("should preserve object with null values", () => {
    const original = {
      id: 1,
      name: "Test",
      description: null,
      optional: null,
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
  });

  it("should preserve empty object", () => {
    const original = {};
    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
  });

  it("should preserve object with various data types", () => {
    const original = {
      string: "text",
      number: 42,
      boolean: true,
      null: null,
      array: [1, 2, 3],
      object: { nested: "value" },
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
  });
});

describe("type preservation", () => {
  it("should preserve type distinction between string and number", () => {
    const original = {
      stringValue: "123",
      numberValue: 123,
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
    expect(typeof unmarshalled.stringValue).toBe("string");
    expect(typeof unmarshalled.numberValue).toBe("number");
  });

  it("should preserve type distinction between array and set", () => {
    const original = {
      stringArray: ["a", "b", "c"],
      numberArray: [1, 2, 3],
      mixedArray: [1, "two", true],
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
  });

  it("should preserve boolean false vs null", () => {
    const original = {
      falseValue: false,
      nullValue: null,
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
    expect(unmarshalled.falseValue).toBe(false);
    expect(unmarshalled.nullValue).toBe(null);
  });

  it("should preserve zero vs empty string", () => {
    const original = {
      zeroValue: 0,
      emptyString: "",
    };

    const marshalled = marshallObject(original);
    const unmarshalled = unmarshallItem(marshalled);
    expect(unmarshalled).toEqual(original);
    expect(unmarshalled.zeroValue).toBe(0);
    expect(unmarshalled.emptyString).toBe("");
  });
});

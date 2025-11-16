/**
 * @file Common command definition types
 */

/**
 * DynamoDB command definition
 */
export type CommandDefinition<TName extends string, TInput, TOutput> = {
  readonly name: TName;
  readonly _input: TInput;
  readonly _output: TOutput;
};

/**
 * Extract command name
 */
export type CommandName<T> = T extends CommandDefinition<infer N, unknown, unknown> ? N : never;

/**
 * Extract Input type
 */
export type CommandInput<T> = T extends CommandDefinition<string, infer I, unknown> ? I : never;

/**
 * Extract Output type
 */
export type CommandOutput<T> = T extends CommandDefinition<string, unknown, infer O> ? O : never;

/**
 * Command definition helper function
 */
export const defineCommand = <TName extends string, TInput, TOutput>(
  name: TName,
): CommandDefinition<TName, TInput, TOutput> => {
  return {
    name,
    // eslint-disable-next-line custom/no-as-outside-guard -- Type-level placeholder for command input/output types
    _input: undefined as unknown as TInput,
    // eslint-disable-next-line custom/no-as-outside-guard -- Type-level placeholder for command input/output types
    _output: undefined as unknown as TOutput,
  };
};

// =====================
// Case conversion utilities
// =====================

/**
 * Convert UpperCamelCase to lowerCamelCase
 */
export const upperCamelToLowerCamel = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * Convert lowerCamelCase to UpperCamelCase
 */
export const lowerCamelToUpperCamel = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert UpperCamelCase to lowerCamelCase (type level)
 */
export type UpperCamelToLowerCamel<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

/**
 * Convert lowerCamelCase to UpperCamelCase (type level)
 */
export type LowerCamelToUpperCamel<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

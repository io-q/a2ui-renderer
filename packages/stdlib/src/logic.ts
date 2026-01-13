/**
 * Standard Logic Functions for A2UI Client Functions
 * These functions provide simple conditional logic.
 */

/**
 * Conditional expression: returns trueValue if condition is truthy, else falseValue.
 * @a2ui-function std:if
 */
export function ifElse<T>(condition: unknown, trueValue: T, falseValue: T): T {
  return condition ? trueValue : falseValue;
}

/**
 * Switch expression: returns the value matching the case, or defaultValue.
 * @a2ui-function std:switch
 */
export function switchCase<T>(
  value: unknown,
  cases: Record<string, T>,
  defaultValue: T
): T {
  const key = String(value);
  return key in cases ? cases[key] : defaultValue;
}

/**
 * Logical AND: returns true if all values are truthy.
 * @a2ui-function std:and
 */
export function and(...values: unknown[]): boolean {
  return values.every(Boolean);
}

/**
 * Logical OR: returns true if any value is truthy.
 * @a2ui-function std:or
 */
export function or(...values: unknown[]): boolean {
  return values.some(Boolean);
}

/**
 * Logical NOT: returns the inverse of the value.
 * @a2ui-function std:not
 */
export function not(value: unknown): boolean {
  return !value;
}

/**
 * Equality check.
 * @a2ui-function std:eq
 */
export function eq(a: unknown, b: unknown): boolean {
  return a === b;
}

/**
 * Inequality check.
 * @a2ui-function std:neq
 */
export function neq(a: unknown, b: unknown): boolean {
  return a !== b;
}

/**
 * Greater than check.
 * @a2ui-function std:gt
 */
export function gt(a: number, b: number): boolean {
  return a > b;
}

/**
 * Less than check.
 * @a2ui-function std:lt
 */
export function lt(a: number, b: number): boolean {
  return a < b;
}

/**
 * Checks if array contains a value.
 * @a2ui-function std:includes
 */
export function includes<T>(arr: T[], value: T): boolean {
  if (!Array.isArray(arr)) return false;
  return arr.includes(value);
}

/**
 * Standard Validators for A2UI Client Functions
 * These functions return true if validation passes, false otherwise.
 */

/**
 * Validates that a value is not empty.
 * @a2ui-function std:required
 */
export function required(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validates that a string is a valid email address.
 * @a2ui-function std:email
 */
export function email(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Validates that a string is a valid URL.
 * @a2ui-function std:url
 */
export function url(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates string length is within bounds.
 * @a2ui-function std:length
 */
export function length(value: string, min: number, max?: number): boolean {
  if (!value || typeof value !== 'string') return false;
  const len = value.length;
  if (len < min) return false;
  if (max !== undefined && len > max) return false;
  return true;
}

/**
 * Validates value matches a regex pattern.
 * @a2ui-function std:regex
 */
export function regex(value: string, pattern: string): boolean {
  if (!value || typeof value !== 'string') return false;
  try {
    const re = new RegExp(pattern);
    return re.test(value);
  } catch {
    return false;
  }
}

/**
 * Validates a number is within a range.
 * @a2ui-function std:range
 */
export function range(value: number, min: number, max: number): boolean {
  if (typeof value !== 'number' || isNaN(value)) return false;
  return value >= min && value <= max;
}

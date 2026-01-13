/**
 * Standard Formatters for A2UI Client Functions
 * These functions transform data for display.
 */

/**
 * Formats a number as currency.
 * @a2ui-function std:currency
 */
export function currency(
  value: number,
  currencyCode: string = 'USD',
  locale: string = 'en-US'
): string {
  if (typeof value !== 'number' || isNaN(value)) return '';
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  } catch {
    return value.toString();
  }
}

/**
 * Formats a date string or timestamp.
 * @a2ui-function std:date
 */
export function date(
  value: string | number | Date,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
): string {
  try {
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat(locale, { dateStyle: format }).format(d);
  } catch {
    return '';
  }
}

/**
 * Formats a date as relative time (e.g., "2 hours ago").
 * @a2ui-function std:relativeTime
 */
export function relativeTime(
  value: string | number | Date,
  locale: string = 'en-US'
): string {
  try {
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '';
    
    const now = Date.now();
    const diffMs = now - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (Math.abs(diffDay) >= 1) return rtf.format(-diffDay, 'day');
    if (Math.abs(diffHour) >= 1) return rtf.format(-diffHour, 'hour');
    if (Math.abs(diffMin) >= 1) return rtf.format(-diffMin, 'minute');
    return rtf.format(-diffSec, 'second');
  } catch {
    return '';
  }
}

/**
 * Formats a number with grouping separators.
 * @a2ui-function std:number
 */
export function number(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  if (typeof value !== 'number' || isNaN(value)) return '';
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return value.toString();
  }
}

/**
 * Truncates a string to a maximum length.
 * @a2ui-function std:truncate
 */
export function truncate(value: string, maxLength: number, suffix: string = '...'): string {
  if (!value || typeof value !== 'string') return '';
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength - suffix.length) + suffix;
}

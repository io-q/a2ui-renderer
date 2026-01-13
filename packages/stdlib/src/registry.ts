/**
 * Function Registry for A2UI Renderers
 * Maps function names to implementations.
 */

import * as validators from './validators.js';
import * as formatters from './formatters.js';
import * as logic from './logic.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClientFunction = (...args: any[]) => unknown;

export interface FunctionRegistry {
  get(name: string): ClientFunction | undefined;
  register(name: string, fn: ClientFunction): void;
  has(name: string): boolean;
  execute(name: string, ...args: unknown[]): unknown;
}

/**
 * Creates a new function registry pre-populated with standard functions.
 */
export function createFunctionRegistry(): FunctionRegistry {
  const registry = new Map<string, ClientFunction>();

  // Register validators
  registry.set('std:required', validators.required);
  registry.set('std:email', validators.email);
  registry.set('std:url', validators.url);
  registry.set('std:length', validators.length);
  registry.set('std:regex', validators.regex);
  registry.set('std:range', validators.range);

  // Register formatters
  registry.set('std:currency', formatters.currency);
  registry.set('std:date', formatters.date);
  registry.set('std:relativeTime', formatters.relativeTime);
  registry.set('std:number', formatters.number);
  registry.set('std:truncate', formatters.truncate);

  // Register logic
  registry.set('std:if', logic.ifElse);
  registry.set('std:switch', logic.switchCase);
  registry.set('std:and', logic.and);
  registry.set('std:or', logic.or);
  registry.set('std:not', logic.not);
  registry.set('std:eq', logic.eq);
  registry.set('std:neq', logic.neq);
  registry.set('std:gt', logic.gt);
  registry.set('std:lt', logic.lt);
  registry.set('std:includes', logic.includes);

  return {
    get(name: string) {
      return registry.get(name);
    },
    register(name: string, fn: ClientFunction) {
      registry.set(name, fn);
    },
    has(name: string) {
      return registry.has(name);
    },
    execute(name: string, ...args: unknown[]) {
      const fn = registry.get(name);
      if (!fn) {
        throw new Error(`Function not found: ${name}`);
      }
      return fn(...args);
    },
  };
}

/**
 * Hook for dispatching actions.
 */

import { useCallback } from 'react';
import { useA2UIContext } from '../context.js';

/**
 * Action definition from a component.
 */
interface ActionDef {
  name: string;
  context?: Record<string, { path?: string } | string | number | boolean>;
}

/**
 * Hook to create an action handler for a component.
 */
export function useAction(componentId: string) {
  const { dispatchAction, getDataValue, surfaceId } = useA2UIContext();

  /**
   * Resolves action context, replacing path references with actual values.
   */
  const resolveContext = useCallback(
    (contextDef?: ActionDef['context']): Record<string, unknown> => {
      if (!contextDef) return {};
      const resolved: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(contextDef)) {
        if (typeof value === 'object' && value !== null && 'path' in value) {
          resolved[key] = getDataValue(value.path as string);
        } else {
          resolved[key] = value;
        }
      }
      return resolved;
    },
    [getDataValue]
  );

  /**
   * Dispatches an action with resolved context.
   */
  const handleAction = useCallback(
    (action: ActionDef) => {
      const context = resolveContext(action.context);
      dispatchAction(action.name, context);
    },
    [dispatchAction, resolveContext]
  );

  return { handleAction, resolveContext, surfaceId };
}

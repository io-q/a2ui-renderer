/**
 * Hook for accessing components from the registry.
 */

import { useMemo } from 'react';
import { useA2UIContext } from '../context.js';
import type { A2UIComponentProps } from '../types.js';

/**
 * Hook to get a single component by ID.
 */
export function useComponent(id: string): A2UIComponentProps | undefined {
  const { components } = useA2UIContext();
  return components.get(id);
}

/**
 * Hook to get child components by their parent's children array.
 */
export function useComponents(childIds: string[]): A2UIComponentProps[] {
  const { components } = useA2UIContext();
  return useMemo(
    () =>
      childIds
        .map((id) => components.get(id))
        .filter((c): c is A2UIComponentProps => c !== undefined),
    [childIds, components]
  );
}

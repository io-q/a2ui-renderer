/**
 * Hook for accessing and modifying the data model.
 */

import { useCallback } from 'react';
import { useA2UIContext } from '../context.js';

/**
 * Hook to access the entire data model.
 */
export function useDataModel() {
  const { dataModel, setDataValue, getDataValue } = useA2UIContext();
  return { dataModel, setDataValue, getDataValue };
}

/**
 * Hook to access a specific value in the data model.
 * Provides reactive updates when the value changes.
 */
export function useDataValue<T = unknown>(path: string): [T, (value: T) => void] {
  const { getDataValue, setDataValue } = useA2UIContext();

  const value = getDataValue(path) as T;
  const setValue = useCallback(
    (newValue: T) => setDataValue(path, newValue),
    [path, setDataValue]
  );

  return [value, setValue];
}

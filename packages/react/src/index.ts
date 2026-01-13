/**
 * @a2ui-renderer/react
 * Headless React hooks and components for A2UI Renderers
 */

export { A2UIProvider, useA2UI, useA2UIContext } from './context';
export { useDataModel, useDataValue } from './hooks/useDataModel';
export { useComponent, useComponents } from './hooks/useComponent';
export { useAction } from './hooks/useAction';
export type { A2UIContextValue, ComponentMap, A2UIProviderProps } from './types';

/**
 * Type definitions for A2UI React Renderer
 */

import type { ReactNode, ComponentType } from 'react';

/**
 * Function registry interface (mirrors @a2ui-renderer/stdlib)
 */
export interface FunctionRegistry {
  get(name: string): ((...args: unknown[]) => unknown) | undefined;
  register(name: string, fn: (...args: unknown[]) => unknown): void;
  has(name: string): boolean;
  execute(name: string, ...args: unknown[]): unknown;
}

/**
 * A map of component type names to React components.
 */
export type ComponentMap = Record<string, ComponentType<A2UIComponentProps>>;

/**
 * Props passed to every A2UI component.
 */
export interface A2UIComponentProps {
  /** The component's unique ID */
  id: string;
  /** The component type name */
  component?: string;
  /** Child component IDs (for containers) */
  children?: any;
  /** All other properties from the A2UI message */
  [key: string]: any;
}

/**
 * The shape of the A2UI context value.
 */
export interface A2UIContextValue {
  /** The local data model */
  dataModel: Record<string, unknown>;
  /** Update a value in the data model */
  setDataValue: (path: string, value: unknown) => void;
  /** Get a value from the data model */
  getDataValue: (path: string) => unknown;
  /** All registered components keyed by ID */
  components: Map<string, A2UIComponentProps>;
  /** The component registry */
  componentMap: ComponentMap;
  /** The function registry from stdlib */
  functionRegistry: FunctionRegistry;
  /** Dispatch an action to the server */
  dispatchAction: (name: string, context: Record<string, unknown>) => void;
  /** The current surface ID */
  surfaceId: string | null;
  /** Internal: Set surface ID */
  setSurfaceId: (id: string | null) => void;
  /** Internal: Set component store */
  setComponentStore: (fn: (prev: Map<string, A2UIComponentProps>) => Map<string, A2UIComponentProps>) => void;
}

/**
 * Props for the A2UIProvider component.
 */
export interface A2UIProviderProps {
  /** The component map (string -> React Component) */
  components: ComponentMap;
  /** Optional function registry (uses stdlib default if not provided) */
  functionRegistry?: FunctionRegistry;
  /** Callback when an action is triggered */
  onAction?: (action: {
    name: string;
    surfaceId: string;
    sourceComponentId: string;
    timestamp: string;
    context: Record<string, unknown>;
  }) => void;
  /** Callback when data model changes (for debugging) */
  onDataModelChange?: (dataModel: Record<string, unknown>) => void;
  children: ReactNode;
}

/**
 * A2UI v0.9 Server-to-Client message types
 */
export interface CreateSurfaceMessage {
  createSurface: {
    surfaceId: string;
    catalogId: string;
  };
}

export interface UpdateComponentsMessage {
  updateComponents: {
    surfaceId: string;
    components: A2UIComponentProps[];
  };
}

export interface UpdateDataModelMessage {
  updateDataModel: {
    surfaceId: string;
    path?: string;
    value: unknown;
  };
}

export interface DeleteSurfaceMessage {
  deleteSurface: {
    surfaceId: string;
  };
}

export type ServerToClientMessage =
  | CreateSurfaceMessage
  | UpdateComponentsMessage
  | UpdateDataModelMessage
  | DeleteSurfaceMessage;

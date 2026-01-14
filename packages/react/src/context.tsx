/**
 * A2UI React Context and Provider
 */

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    type ReactNode,
} from 'react';
import type {
    A2UIContextValue,
    A2UIProviderProps,
    A2UIComponentProps,
    ServerToClientMessage,
    FunctionRegistry,
} from './types';

const A2UIContext = createContext<A2UIContextValue | null>(null);

/**
 * Hook to access the A2UI context.
 * Throws if used outside of A2UIProvider.
 */
export function useA2UIContext(): A2UIContextValue {
    const ctx = useContext(A2UIContext);
    if (!ctx) {
        throw new Error('useA2UIContext must be used within an A2UIProvider');
    }
    return ctx;
}

/**
 * Resolves a JSON Pointer path to a value in an object.
 */
function getByPath(obj: Record<string, unknown>, path: string): unknown {
    if (!path || path === '/') return obj;
    const parts = path.split('/').filter(Boolean);
    let current: unknown = obj;
    for (const part of parts) {
        if (current === null || current === undefined) return undefined;
        if (typeof current !== 'object') return undefined;
        current = (current as Record<string, unknown>)[part];
    }
    return current;
}

/**
 * Sets a value at a JSON Pointer path in an object (immutably).
 */
function setByPath(
    obj: Record<string, unknown>,
    path: string,
    value: unknown
): Record<string, unknown> {
    if (!path || path === '/') {
        return value as Record<string, unknown>;
    }
    const parts = path.split('/').filter(Boolean);
    const result = { ...obj };
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        current[part] = { ...(current[part] as Record<string, unknown> || {}) };
        current = current[part] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
    return result;
}

/**
 * Provider component that manages A2UI state.
 */
export function A2UIProvider({
    components: componentMap,
    functionRegistry: providedRegistry,
    onAction,
    onDataModelChange,
    children,
}: A2UIProviderProps): ReactNode {
    const [dataModel, setDataModel] = useState<Record<string, unknown>>({});
    const [componentStore, setComponentStore] = useState<Map<string, A2UIComponentProps>>(
        new Map()
    );
    const [surfaceId, setSurfaceId] = useState<string | null>(null);

    const functionRegistry = useMemo(() => {
        if (!providedRegistry) {
            throw new Error('A2UIProvider requires a functionRegistry prop. Use createFunctionRegistry() from @a2ui-renderer/stdlib.');
        }
        return providedRegistry;
    }, [providedRegistry]);

    const getDataValue = useCallback(
        (path: string) => getByPath(dataModel, path),
        [dataModel]
    );

    const setDataValue = useCallback(
        (path: string, value: unknown) => {
            setDataModel((prev) => {
                const next = setByPath(prev, path, value);
                onDataModelChange?.(next);
                return next;
            });
        },
        [onDataModelChange]
    );

    const dispatchAction = useCallback(
        (name: string, context: Record<string, unknown>) => {
            if (!surfaceId) {
                console.warn('Cannot dispatch action: no active surface');
                return;
            }
            onAction?.({
                name,
                surfaceId,
                sourceComponentId: '', // Will be set by component
                timestamp: new Date().toISOString(),
                context,
            });
        },
        [surfaceId, onAction]
    );

    const contextValue = useMemo<A2UIContextValue>(
        () => ({
            dataModel,
            setDataValue,
            getDataValue,
            components: componentStore,
            componentMap,
            functionRegistry,
            dispatchAction,
            surfaceId,
            setSurfaceId,
            setComponentStore,
        }),
        [
            dataModel,
            setDataValue,
            getDataValue,
            componentStore,
            componentMap,
            functionRegistry,
            dispatchAction,
            surfaceId,
        ]
    );

    return (
        <A2UIContext.Provider value={contextValue}>
            {children}
        </A2UIContext.Provider>
    );
}

/**
 * Hook that provides A2UI state and message processing.
 */
export function useA2UI() {
    const ctx = useA2UIContext();

    const processMessage = useCallback(
        (message: ServerToClientMessage) => {
            if ('createSurface' in message) {
                // Handle createSurface
                ctx.setSurfaceId(message.createSurface.surfaceId);
            } else if ('updateComponents' in message) {
                // Handle updateComponents
                ctx.setComponentStore((prev) => {
                    const next = new Map<string, A2UIComponentProps>(prev);
                    for (const comp of message.updateComponents.components) {
                        next.set(comp.id, comp);
                    }
                    return next;
                });
            } else if ('updateDataModel' in message) {
                const { path, value } = message.updateDataModel;
                ctx.setDataValue(path ?? '/', value);
            } else if ('deleteSurface' in message) {
                // Handle deleteSurface
                if (ctx.surfaceId === message.deleteSurface.surfaceId) {
                    ctx.setSurfaceId(null);
                    ctx.setComponentStore(() => new Map());
                }
            }
        },
        [ctx]
    );

    return {
        ...ctx,
        processMessage,
    };
}

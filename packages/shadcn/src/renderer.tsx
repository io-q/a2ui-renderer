/**
 * A2UI ShadCN Renderer
 * A pre-configured renderer using ShadCN components
 */

import { A2UIProvider, type A2UIProviderProps } from '@a2ui-renderer/react';
import { createFunctionRegistry } from '@a2ui-renderer/stdlib';
import { shadcnCatalog } from './catalog';
import type { ReactNode } from 'react';

interface A2UIShadcnRendererProps {
    /** Callback when an action is triggered */
    onAction?: A2UIProviderProps['onAction'];
    /** Callback when data model changes */
    onDataModelChange?: A2UIProviderProps['onDataModelChange'];
    /** Additional components to merge with ShadCN catalog */
    components?: Partial<typeof shadcnCatalog>;
    children: ReactNode;
}

/**
 * Pre-configured A2UI Provider with ShadCN components
 */
export function A2UIShadcnRenderer({
    onAction,
    onDataModelChange,
    components = {},
    children,
}: A2UIShadcnRendererProps) {
    const mergedComponents = { ...shadcnCatalog, ...components } as any;
    const functionRegistry = createFunctionRegistry();

    return (
        <A2UIProvider
            components={mergedComponents}
            functionRegistry={functionRegistry}
            onAction={onAction}
            onDataModelChange={onDataModelChange}
        >
            {children}
        </A2UIProvider>
    );
}

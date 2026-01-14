import { type ReactNode } from 'react';
import { useA2UIContext } from './context';
import { useComponent } from './hooks/useComponent';

/**
 * Prop type for A2UIRenderer
 */
export interface A2UIRendererProps {
    /** The ID of the root component to start rendering from */
    rootId: string;
}

/**
 * Recursive renderer for A2UI components.
 * 
 * Takes a root ID, looks it up in the registry, resolves the React implementation,
 * and recursively renders children.
 */
export function A2UIRenderer({ rootId }: A2UIRendererProps): ReactNode {
    const { componentMap } = useA2UIContext();
    const componentData = useComponent(rootId);

    if (!componentData) {
        return null;
    }

    const { component: typeName, children, id, ...restProps } = componentData;

    // Resolve the React component implementation
    const Component = typeName ? componentMap[typeName] : undefined;

    if (!Component) {
        console.warn(`[A2UI] Component type "${typeName}" not found in registry.`);
        return null;
    }

    // Pass restProps, the ID, and children
    // If children are present, they need to be rendered recursively.
    // In A2UI, 'children' in the props is typically an array of IDs or a single ID.

    // We don't render children automatically here differently than passing them as props.
    // However, if the component expects `children` as ReactNodes, we need to convert the ID list.

    // Check if `children` exists and looks like a list of IDs (strings)
    let renderedChildren: ReactNode = undefined;

    if (Array.isArray(children)) {
        renderedChildren = children.map((childId: string) => (
            <A2UIRenderer key={childId} rootId={childId} />
        ));
    } else if (typeof children === 'string') {
        renderedChildren = <A2UIRenderer key={children} rootId={children} />;
    } else if (children) {
        // If it's an object or something else, pass it as is (could be slotProps)
        renderedChildren = children;
    }

    return (
        <Component id={id} {...restProps}>
            {renderedChildren}
        </Component>
    );
}

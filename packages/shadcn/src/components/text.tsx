/**
 * Text component for A2UI
 * @a2ui-component Text
 */

import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';
import { useDataValue } from '@a2ui-renderer/react';

interface TextProps extends A2UIComponentProps {
    text?: string;
    className?: string;
}

/**
 * @a2ui-component Text
 */
export function Text({ id, text, className }: TextProps) {
    // If text is a path (starts with /), resolve it from data model
    const isPath = typeof text === 'string' && text.startsWith('/');
    const [resolvedValue] = useDataValue<string>(isPath ? text : '');

    return (
        <p id={id} className={cn('text-sm text-foreground', className)}>
            {isPath ? resolvedValue : text}
        </p>
    );
}

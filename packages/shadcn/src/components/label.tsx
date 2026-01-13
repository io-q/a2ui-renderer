/**
 * ShadCN-styled Label
 * @a2ui-component Label
 */

import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';

interface LabelProps extends A2UIComponentProps {
    text?: string;
    htmlFor?: string;
    className?: string;
}

/**
 * A styled label component
 * @a2ui-component Label
 */
export function Label({ id, text, htmlFor, className }: LabelProps) {
    return (
        <label
            id={id}
            htmlFor={htmlFor}
            className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                className
            )}
        >
            {text}
        </label>
    );
}

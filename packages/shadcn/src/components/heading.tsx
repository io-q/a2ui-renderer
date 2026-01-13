/**
 * Heading component for A2UI
 * @a2ui-component Heading
 */

import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';

interface HeadingProps extends A2UIComponentProps {
    text?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

const levelStyles = {
    1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
    2: 'text-3xl font-semibold tracking-tight',
    3: 'text-2xl font-semibold tracking-tight',
    4: 'text-xl font-semibold tracking-tight',
    5: 'text-lg font-semibold',
    6: 'text-base font-semibold',
};

/**
 * @a2ui-component Heading
 */
export function Heading({ id, text, level = 2, className }: HeadingProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <Tag id={id} className={cn(levelStyles[level], className)}>
            {text}
        </Tag>
    );
}

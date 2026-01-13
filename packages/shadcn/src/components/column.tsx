/**
 * Layout components for A2UI
 */

import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';
import type { ReactNode } from 'react';

interface LayoutProps extends A2UIComponentProps {
    gap?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    children?: ReactNode;
}

const gapStyles = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
};

/**
 * @a2ui-component Column
 */
export function Column({ id, gap = 'md', className, children }: LayoutProps) {
    return (
        <div id={id} className={cn('flex flex-col', gapStyles[gap], className)}>
            {children}
        </div>
    );
}

/**
 * @a2ui-component Row
 */
export function Row({ id, gap = 'md', className, children }: LayoutProps) {
    return (
        <div id={id} className={cn('flex flex-row items-center', gapStyles[gap], className)}>
            {children}
        </div>
    );
}

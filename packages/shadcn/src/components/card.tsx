/**
 * ShadCN-styled Card components
 * @a2ui-component Card
 */

import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';
import type { ReactNode } from 'react';

interface CardProps extends Omit<A2UIComponentProps, 'children'> {
    className?: string;
    children?: ReactNode;
}

/**
 * @a2ui-component Card
 */
export function Card({ id, className, children }: CardProps) {
    return (
        <div
            id={id}
            className={cn(
                'rounded-lg border bg-card text-card-foreground shadow-sm',
                className
            )}
        >
            {children}
        </div>
    );
}

/**
 * @a2ui-component CardHeader
 */
export function CardHeader({ id, className, children }: CardProps) {
    return (
        <div id={id} className={cn('flex flex-col space-y-1.5 p-6', className)}>
            {children}
        </div>
    );
}

/**
 * @a2ui-component CardTitle
 */
export function CardTitle({ id, className, children }: CardProps) {
    return (
        <h3
            id={id}
            className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
        >
            {children}
        </h3>
    );
}

/**
 * @a2ui-component CardDescription
 */
export function CardDescription({ id, className, children }: CardProps) {
    return (
        <p id={id} className={cn('text-sm text-muted-foreground', className)}>
            {children}
        </p>
    );
}

/**
 * @a2ui-component CardContent
 */
export function CardContent({ id, className, children }: CardProps) {
    return (
        <div id={id} className={cn('p-6 pt-0', className)}>
            {children}
        </div>
    );
}

/**
 * @a2ui-component CardFooter
 */
export function CardFooter({ id, className, children }: CardProps) {
    return (
        <div id={id} className={cn('flex items-center p-6 pt-0', className)}>
            {children}
        </div>
    );
}

/**
 * ShadCN-styled Button for A2UI
 * @a2ui-component Button
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';
import { useAction } from '@a2ui-renderer/react';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface ButtonProps extends A2UIComponentProps, VariantProps<typeof buttonVariants> {
    label?: string;
    action?: { name: string; context?: Record<string, unknown> };
    disabled?: boolean;
    className?: string;
}

/**
 * A styled button that dispatches A2UI actions
 * @a2ui-component Button
 */
export function Button({
    id,
    label,
    action,
    variant,
    size,
    disabled,
    className,
}: ButtonProps) {
    const { handleAction } = useAction(id);

    return (
        <button
            id={id}
            className={cn(buttonVariants({ variant, size, className }))}
            disabled={disabled}
            onClick={() => action && handleAction(action)}
        >
            {label}
        </button>
    );
}

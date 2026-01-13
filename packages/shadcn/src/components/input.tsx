/**
 * ShadCN-styled Input for A2UI with two-way binding
 * @a2ui-component TextField
 */

import { cn } from '../lib/utils';
import type { A2UIComponentProps } from '@a2ui-renderer/react';
import { useDataValue } from '@a2ui-renderer/react';
import { email as validateEmail, required } from '@a2ui-renderer/stdlib';

interface InputProps extends A2UIComponentProps {
    label?: string;
    value?: string;
    placeholder?: string;
    variant?: 'text' | 'email' | 'password' | 'number';
    disabled?: boolean;
    className?: string;
}

/**
 * A styled input with two-way data binding
 * @a2ui-component TextField
 */
export function Input({
    id,
    label,
    value,
    placeholder,
    variant = 'text',
    disabled,
    className,
}: InputProps) {
    // Two-way binding: value is a path to the data model
    const isPath = typeof value === 'string' && value.startsWith('/');
    const [inputValue, setInputValue] = useDataValue<string>(isPath ? value : '');

    const isValid = variant === 'email'
        ? validateEmail(inputValue || '')
        : required(inputValue);

    return (
        <div id={id} className="grid w-full max-w-sm items-center gap-1.5">
            {label && (
                <label
                    htmlFor={`${id}-input`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
            )}
            <input
                id={`${id}-input`}
                type={variant}
                disabled={disabled}
                placeholder={placeholder}
                value={inputValue || ''}
                onChange={(e) => setInputValue(e.target.value)}
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    !isValid && inputValue && 'border-destructive',
                    className
                )}
            />
            {!isValid && inputValue && variant === 'email' && (
                <p className="text-sm text-destructive">Please enter a valid email</p>
            )}
        </div>
    );
}

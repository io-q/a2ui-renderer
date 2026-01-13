/**
 * Demo component implementations for A2UI
 */

import type { ComponentMap, A2UIComponentProps } from '@a2ui-renderer/react'
import { useDataValue, useAction } from '@a2ui-renderer/react'
import { email, required } from '@a2ui-renderer/stdlib'
import './styles.css'

/**
 * Displays text content, optionally bound to data model.
 * @a2ui-component Text
 */
function Text({ id, text }: A2UIComponentProps & { text?: string }) {
    // If text is a path (starts with /), resolve it from data model
    const isPath = typeof text === 'string' && text.startsWith('/')
    const [resolvedValue] = useDataValue<string>(isPath ? text : '')

    return (
        <p id={id} className="a2ui-text">
            {isPath ? resolvedValue : text}
        </p>
    )
}

/**
 * Displays a heading with configurable level.
 * @a2ui-component Heading
 */
function Heading({ id, text, level = 2 }: A2UIComponentProps & { text?: string; level?: number }) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    return <Tag id={id} className="a2ui-heading">{text}</Tag>
}

/**
 * An interactive button that dispatches actions.
 * @a2ui-component Button
 */
function Button({
    id,
    label,
    action,
    variant = 'primary'
}: A2UIComponentProps & {
    label?: string;
    action?: { name: string; context?: Record<string, unknown> };
    variant?: 'primary' | 'secondary' | 'danger'
}) {
    const { handleAction } = useAction(id)

    return (
        <button
            id={id}
            className={`a2ui-button a2ui-button--${variant}`}
            onClick={() => action && handleAction(action)}
        >
            {label}
        </button>
    )
}

/**
 * A text input with two-way data binding.
 * @a2ui-component TextField
 */
function TextField({
    id,
    label,
    value,
    placeholder,
    variant = 'text'
}: A2UIComponentProps & {
    label?: string;
    value?: string;
    placeholder?: string;
    variant?: 'text' | 'email' | 'password'
}) {
    // Two-way binding: value is a path to the data model
    const isPath = typeof value === 'string' && value.startsWith('/')
    const [inputValue, setInputValue] = useDataValue<string>(isPath ? value : '')

    const isValid = variant === 'email' ? email(inputValue || '') : required(inputValue)

    return (
        <div id={id} className="a2ui-textfield">
            {label && <label className="a2ui-textfield__label">{label}</label>}
            <input
                type={variant}
                className={`a2ui-textfield__input ${!isValid && inputValue ? 'a2ui-textfield__input--error' : ''}`}
                value={inputValue || ''}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {!isValid && inputValue && variant === 'email' && (
                <span className="a2ui-textfield__error">Please enter a valid email</span>
            )}
        </div>
    )
}

/**
 * A vertical flex container.
 * @a2ui-component Column
 */
function Column({ id, children }: A2UIComponentProps) {
    return (
        <div id={id} className="a2ui-column">
            {/* Children would be rendered by the A2UI processor */}
            {children}
        </div>
    )
}

/**
 * A horizontal flex container.
 * @a2ui-component Row
 */
function Row({ id, children }: A2UIComponentProps) {
    return (
        <div id={id} className="a2ui-row">
            {children}
        </div>
    )
}

/**
 * A card container with visual styling.
 * @a2ui-component Card
 */
function Card({ id, children }: A2UIComponentProps) {
    return (
        <div id={id} className="a2ui-card">
            {children}
        </div>
    )
}

export const componentMap: ComponentMap = {
    Text,
    Heading,
    Button,
    TextField,
    Column,
    Row,
    Card,
}

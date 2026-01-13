# @a2ui-renderer/stdlib

Standard library of shared utility functions (validators, formatters, logic) for A2UI renderers.  This package allows different A2UI clients (React, Lit, Angular, etc.) to share identical business logic implementation.

## Installation

```bash
bun add @a2ui-renderer/stdlib
# or
npm install @a2ui-renderer/stdlib
```

## Usage

### Validators

Functions that return `true` if valid, `false` otherwise.

```ts
import { required, email } from '@a2ui-renderer/stdlib';

required('hello'); // true
required(''); // false

email('test@example.com'); // true
email('invalid'); // false
```

**Available Validators:**
- `required(value)`
- `email(value)`
- `url(value)`
- `length(value, min, max)`
- `regex(value, pattern)`
- `range(value, min, max)`

### Formatters

Functions that transform values for display.

```ts
import { currency, relativeTime } from '@a2ui-renderer/stdlib';

currency(1234.56, 'USD'); // "$1,234.56"
relativeTime(Date.now() - 60000); // "1 minute ago"
```

**Available Formatters:**
- `currency(value, code)`
- `date(value, format)`
- `relativeTime(value)`
- `number(value, options)`
- `truncate(value, length)`

### Logic

Logic helpers for condition evaluation.

```ts
import { ifElse, and, eq } from '@a2ui-renderer/stdlib';
```

**Available Functions:**
- `ifElse`, `switchCase`
- `and`, `or`, `not`
- `eq`, `neq`, `gt`, `lt`
- `includes`

## Function Registry

Create a registry to dynamically lookup functions by name (useful for A2UI expression evaluation).

```ts
import { createFunctionRegistry } from '@a2ui-renderer/stdlib';

const registry = createFunctionRegistry();

// Standard functions are pre-registered
registry.execute('std:email', 'test@example.com'); // true

// Register custom functions
registry.register('myCustomFn', (arg) => ...);
```

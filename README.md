# A2UI Renderer Toolkit

> ⚠️ **Pre-release Software** — Targets A2UI v0.9 (unreleased). Breaking changes expected.

A monorepo toolkit for building framework-agnostic A2UI renderers.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@a2ui-renderer/stdlib` | Standard validators, formatters, and logic functions | ✅ Ready |
| `@a2ui-renderer/react` | Headless React hooks and Provider | ✅ Ready |
| `@a2ui-renderer/scanner` | CLI to generate catalog.json from JSDoc | ✅ Ready |
| `@a2ui-renderer/shadcn` | Drop-in ShadCN/Radix component adapter | ✅ Ready |

## Quick Start

```bash
# Install dependencies
bun install

# Run demo app
bun run dev

# Build all packages
bun run build
```

## Demo

The demo app showcases:
- Two-way data binding with `useDataValue`
- Client-side validation with stdlib
- Action dispatch with `useAction`

```bash
cd apps/demo && bun run dev
```

## Scanner CLI

Generate a component catalog from JSDoc annotations:

```bash
bun run packages/scanner/dist/cli.js ./src/components -o catalog.json -r rules.txt
```

Mark components with `@a2ui-component`:

```tsx
/**
 * A custom button that triggers actions.
 * @a2ui-component Button
 */
export function Button({ label, action }: ButtonProps) { ... }
```

## Architecture

```
a2ui-renderer/
├── packages/
│   ├── stdlib/     # Zero-dependency client functions
│   ├── react/      # Headless hooks (peer dep: react)
│   ├── scanner/    # CLI tool (node target, uses ts-morph)
│   └── shadcn/     # ShadCN adapter (peer dep: react, tailwind)
└── apps/
    └── demo/       # Reference implementation
```

## License

MIT

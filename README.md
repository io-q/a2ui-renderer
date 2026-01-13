# A2UI Renderer Toolkit

> ⚠️ **Pre-release Software** — Targets A2UI v0.9 (unreleased). Breaking changes expected.

A monorepo toolkit for building framework-agnostic A2UI renderers.

## Why A2UI?

You might ask: *"Why not just ask the LLM to write React/HTML code directly?"*

While raw code generation is powerful, it has significant drawbacks for production applications:

*   **Safety**: Executing arbitrary LLM-generated code on the client is a major security risk (XSS). A2UI renders a restricted, predefined set of components.
*   **Determinism**: A2UI guarantees the UI structure adheres to a strict schema, preventing "hallucinated" props or invalid HTML.
*   **Streaming**: The A2UI protocol is designed to be streamed token-by-token, allowing the UI to render incrementally as the agent "thinks," providing a much faster perceived latency than waiting for a full valid HTML block.
*   **State Management**: A2UI handles two-way data binding (e.g., form inputs) automatically, syncing the user's state back to the agent without complex manual wiring.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| [`@a2ui-renderer/stdlib`](./packages/stdlib) | Standard validators, formatters, and logic functions | ✅ Ready |
| [`@a2ui-renderer/react`](./packages/react) | Headless React hooks and Provider | ✅ Ready |
| [`@a2ui-renderer/scanner`](./packages/scanner) | CLI to generate catalog.json from JSDoc | ✅ Ready |
| [`@a2ui-renderer/shadcn`](./packages/shadcn) | Drop-in ShadCN/Radix component adapter | ✅ Ready |

## Built With

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ShadCN](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## Installation

<tabs>
  <tab title="npm">
  
  ```bash
  npm install @a2ui-renderer/core @a2ui-renderer/react
  ```
  </tab>
  <tab title="pnpm">
  
  ```bash
  pnpm add @a2ui-renderer/core @a2ui-renderer/react
  ```
  </tab>
  <tab title="bun">
  
  ```bash
  bun add @a2ui-renderer/core @a2ui-renderer/react
  ```
  </tab>
</tabs>

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

[**View Live Demo**](https://io-q.github.io/a2ui-renderer/) (Replace with actual demo URL)

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

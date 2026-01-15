# A2UI Renderer Toolkit

> ⚠️ **Pre-release Software** — Targets A2UI v0.9 (unreleased). Breaking changes expected.

A a2ui toolkit for turning your React Design System into an AI SDK.

## The Pitch

**"Turn your React Design System into an AI Toolkit in seconds."**

Most AI UI frameworks force you to use their components or write brittle JSON schemas manually.
**a2ui-renderer** flips the script:

1.  **Tag it**: Add `@a2ui-component` JSDoc to your existing React components.
2.  **Scan it**: `npx @a2ui-renderer/scanner` generates the AI tool definitions automatically (OpenAI or A2UI format).
3.  **Render it**: Stream the UI response token-by-token using our headless renderer.

It is the missing link between your Component Library and your agents.

## Architecture

![Architecture](https://img.shields.io/badge/Architecture-Headless-blue)

| Package | Description | Status |
|---------|-------------|--------|
| [`@a2ui-renderer/scanner`](./packages/scanner) | **The Wedge**. CLI to generate OpenAI Function Schemas from JSDoc. | ✅ Ready |
| [`@a2ui-renderer/react`](./packages/react) | **The Bridge**. Headless React hooks for streaming UI. | ✅ Ready |
| [`@a2ui-renderer/stdlib`](./packages/stdlib) | **The Validators**. Zero-dependency logic functions. | ✅ Ready |
| [`@a2ui-renderer/shadcn`](./packages/shadcn) | **The Look**. Adapter for ShadCN/Radix UI. | ✅ Ready |

## Quick Start

### 1. Installation

```bash
# Install the core packages
npm install @a2ui-renderer/react @a2ui-renderer/core
```

### 2. Generate AI Tools

Use the scanner to create tool definitions for your AI model (e.g., GPT-4).

```bash
# Interactive mode
npx @a2ui-renderer/scanner

# Or explicit command
npx @a2ui-renderer/scanner ./src/components -f openai -o tools.json
```

### 3. Render the Stream

```tsx
import { A2UIProvider, A2UIRenderer } from '@a2ui-renderer/react';
import { useChat } from 'ai/react'; // Example with Vercel AI SDK

export default function Chat() {
  const { messages } = useChat();
  
  return (
    <A2UIProvider>
       {/* Your AI messages loop... */}
       <A2UIRenderer rootId="root" />
    </A2UIProvider>
  )
}
```

## Live Demo

See the renderer in action:
[**Documentation**](https://io-q.github.io/a2ui-renderer/) | [**Live Demo**](https://io-q.github.io/a2ui-renderer/demo/)

## Development

```bash
# Install dependencies
bun install
 
# Run demo app
bun run dev
 
# Build all packages
bun run build
```

## License

[MIT](./LICENSE)

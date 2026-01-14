# Getting Started

Welcome to `a2ui-renderer`! This guide will help you set up the renderer in your React application.

## Prerequisites

- **Bun** (Recommended) or Node.js v18+
- A React application (Vite, Next.js, etc.)

## Installation

Install the core packages using your package manager of choice:

::: code-group

```bash [bun]
bun add @a2ui-renderer/react @a2ui-renderer/stdlib
```

```bash [npm]
npm install @a2ui-renderer/react @a2ui-renderer/stdlib
```

```bash [pnpm]
pnpm add @a2ui-renderer/react @a2ui-renderer/stdlib
```

:::

## Setup

1.  **Wrap your application** with the `A2UIProvider`.
2.  **Define your component map**.

```tsx
// src/App.tsx
import { A2UIProvider } from '@a2ui-renderer/react';
import { Button } from './components/Button';
import { Card } from './components/Card';

// 1. Create a catalog of components available to the AI
const components = {
  Button,
  Card,
};

function App() {
  return (
    <A2UIProvider components={components}>
      {/* Your app content */}
    </A2UIProvider>
  );
}
```

## Rendering AI Content

Use the `A2UIRenderer` component to render the JSON stream from your AI agent.

```tsx
import { A2UIRenderer } from '@a2ui-renderer/react';
import { useChat } from 'ai/react'; // Example using Vercel AI SDK

function ChatInterface() {
  const { messages } = useChat();
  const lastMessage = messages[messages.length - 1];

  // Assuming the AI returns a JSON string conforming to A2UI protocol
  if (lastMessage?.role === 'assistant' && isA2UI(lastMessage.content)) {
    return (
      <div className="ai-response">
        <A2UIRenderer 
          content={JSON.parse(lastMessage.content)} 
        />
      </div>
    );
  }
}
```

## Next Steps

- Learn about [Core Concepts](./concepts.md) to understand the protocol.
- Use the [Scanner](./scanner.md) to automatically generate your component catalog.

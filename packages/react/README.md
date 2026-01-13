# @a2ui-renderer/react

Headless React hooks and context providers for building A2UI renderers. This package handles the "hard parts" of A2UI (state management, data binding, action dispatching) so you can focus on the UI components.

## Installation

```bash
bun add @a2ui-renderer/react
# or
npm install @a2ui-renderer/react
```

## Core Concepts

### `A2UIProvider`

The root context provider that manages application state.

```tsx
import { A2UIProvider } from '@a2ui-renderer/react';
import { createFunctionRegistry } from '@a2ui-renderer/stdlib';
import { components } from './my-components';

function App() {
  const registry = createFunctionRegistry();

  return (
    <A2UIProvider
      components={components}
      functionRegistry={registry}
      onAction={(action) => console.log('Action:', action)}
      onDataModelChange={(path, value) => console.log('Change:', path, value)}
    >
      {/* Your app content */}
    </A2UIProvider>
  );
}
```

### `useDataValue` (Two-Way Binding)

Hook to bind a component prop to a value in the A2UI data model.

```tsx
import { useDataValue } from '@a2ui-renderer/react';

function TextField({ value }: { value: string }) {
  // If 'value' is a path string (e.g. "/user/name"), it resolves to the data model.
  // Otherwise it returns the literal value.
  const [resolvedValue, setValue] = useDataValue(value);

  return (
    <input
      value={resolvedValue}
      onChange={e => setValue(e.target.value)}
    />
  );
}
```

### `useAction` (Dispatch)

Hook to handle A2UI actions.

```tsx
import { useAction } from '@a2ui-renderer/react';

function Button({ id, action }: { id: string, action: any }) {
  const { handleAction } = useAction(id);

  return (
    <button onClick={() => handleAction(action)}>
      Click Me
    </button>
  );
}
```

### `useComponent` (Recursion)

Hook to render child components dynamically based on the component registry.

```tsx
import { useComponent } from '@a2ui-renderer/react';

function Container({ children }) {
  const { renderComponent } = useComponent();

  return (
    <div>
      {children.map(child => renderComponent(child))}
    </div>
  );
}
```

# @a2ui-renderer/shadcn

A drop-in adapter that maps A2UI components to ShadCN/Radix UI components. This package allows you to instantly render beautiful, accessible UIs from A2UI JSON without writing custom CSS.

## Installation

```bash
bun add @a2ui-renderer/shadcn
# or
npm install @a2ui-renderer/shadcn
```

## Usage

Use the `A2UIShadcnRenderer` component to wrap your application. It comes pre-configured with the ShadCN component catalog.

```tsx
import { A2UIShadcnRenderer } from '@a2ui-renderer/shadcn';
import '@a2ui-renderer/shadcn/dist/index.css'; // Import styles

function App() {
  return (
    <A2UIShadcnRenderer
      onAction={(action) => console.log('Action:', action)}
      onDataModelChange={(path, value) => console.log('Change:', path, value)}
    >
      {/* Your root component content */}
    </A2UIShadcnRenderer>
  );
}
```

## Supported Components

The adapter includes implementations for:

- **Basic**: `Text`, `Heading`
- **Actions**: `Button` (with variants: default, destructive, outline, secondary, ghost, link)
- **Inputs**: `TextField` (mapped to Input), `Label`
- **Layout**: `Column`, `Row`, `Card` (including Header, Title, Content, Footer)

## extending

You can override or extend the default catalog:

```tsx
import { A2UIShadcnRenderer, shadcnCatalog } from '@a2ui-renderer/shadcn';
import { MyCustomButton } from './MyCustomButton';

const myCatalog = {
  ...shadcnCatalog,
  Button: MyCustomButton // Override Button
};

<A2UIShadcnRenderer components={myCatalog} ... />
```

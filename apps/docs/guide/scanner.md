# The Scanner

The **Scanner** (`@a2ui-renderer/scanner`) is your bridge between Code and AI. It automates the tedious work of writing JSON schemas for your AI tools.

## The Pain Point

Normally, if you want an LLM to use a tool, you have to write a complex JSON definition:

```json
{
  "name": "MyButton",
  "description": "A button component",
  "parameters": {
    "type": "object",
    "properties": {
      "label": { "type": "string" }
    }
  }
}
```

If you change your code, you have to update this JSON manually. **This is brittle.**

## The Solution

With the Scanner, you simply run:

```bash
npx @a2ui-renderer/scanner ./src/components
```

It parses your React components and JSDoc to generate the schema automatically.

## Usage

### 1. Annotate Components

Add the `@a2ui-component` tag to any component you want the AI to see.

```tsx
/**
 * A notification card for important alerts.
 * 
 * @a2ui-component Alert
 * @param title - The header of the alert
 * @param severity - "error" | "warning" | "info"
 */
export function Alert({ title, severity }: AlertProps) { ... }
```

### 2. Run the Scan

```bash
# Output to catalog.json
bun run a2ui-scan ./src/components -o public/catalog.json
```

### 3. Feed to AI

The output `catalog.json` is ready to be used as a "Tool Definition" for models like GPT-4 or Claude.

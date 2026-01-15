# @a2ui-renderer/scanner

A CLI tool that automatically generates A2UI Component Catalogs (`catalog.json`) by scanning your TypeScript/React codebase. It uses JSDoc annotations to identify components and extract their schemas.

## Installation

```bash
# Install globally or locally
npm install -g @a2ui-renderer/scanner
# or run directly
npx @a2ui-renderer/scanner
```

## Usage

### Interactive Mode (Recommended)

Simply run the tool without arguments to start the interactive wizard:

```bash
npx @a2ui-renderer/scanner
```

It will prompt you for:
1.  **Component Directory**: Where your React components live (e.g., `./src/components`)
2.  **Output Format**: `a2ui` (default) or `openai`
3.  **Output File**: Where to save the generated JSON

### CLI Arguments

You can also run it in CI/CD pipelines using flags:

```bash
# Generate OpenAI Function Tools
npx @a2ui-renderer/scanner ./src/components -f openai -o tools.json

# Generate A2UI Catalog
npx @a2ui-renderer/scanner ./src/components -o catalog.json
```

### Options

- `[input]`: Input directory to scan (default: current dir)
- `-o, --output <path>`: Path to write the output file
- `-f, --format <type>`: Output format: `a2ui` (default) or `openai`
- `-r, --rules <path>`: Path to write LLM system prompt rules (optional)
- `--title <string>`: Title for the catalog
- `--version <string>`: Version string

## Writing Components

To make a component visible to the scanner, add the `@a2ui-component` JSDoc tag.

```tsx
/**
 * A primary action button.
 * @a2ui-component Button
 */
export function Button({ label, disabled }: { label: string; disabled?: boolean }) {
  return <button disabled={disabled}>{label}</button>;
}
```

The scanner will extract:
1.  **Component Name**: `Button` (becomes function name `render_button` in OpenAI format)
2.  **Description**: "A primary action button."
3.  **Properties**: `label` (required string), `disabled` (optional boolean)

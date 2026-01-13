# @a2ui-renderer/scanner

A CLI tool that automatically generates A2UI Component Catalogs (`catalog.json`) by scanning your TypeScript/React codebase. It uses JSDoc annotations to identify components and extract their schemas.

## Installation

```bash
bun add -d @a2ui-renderer/scanner
# or
npm install -D @a2ui-renderer/scanner
```

## Usage

Run the `a2ui-scan` command pointing to your source directory:

```bash
bun run a2ui-scan ./src/components -o catalog.json -r user_rules.txt
```

### Options

- `[input]`: Input directory to scan (default: current dir)
- `-o, --output <path>`: Path to write the JSON catalog (default: `catalog.json`)
- `-r, --rules <path>`: Path to write LLM generation rules (optional)
- `--title <string>`: Title for the catalog
- `--version <string>`: Version string for the catalog

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
1.  **Component Name**: `Button`
2.  **Description**: "A primary action button."
3.  **Properties**: `label` (required string), `disabled` (optional boolean)

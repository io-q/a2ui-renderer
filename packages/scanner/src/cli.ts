#!/usr/bin/env node
/**
 * A2UI Scanner CLI
 * Usage: a2ui-scan ./src/components -o catalog.json
 */

import { scanComponents } from './scanner.js';
import { generateCatalog, generateRules } from './generator.js';
import * as fs from 'fs';
import * as path from 'path';

interface CliOptions {
  input: string;
  output: string;
  rules?: string;
  title?: string;
  version?: string;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    input: '.',
    output: 'catalog.json',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-o' || arg === '--output') {
      options.output = args[++i] || 'catalog.json';
    } else if (arg === '-r' || arg === '--rules') {
      options.rules = args[++i] || 'rules.txt';
    } else if (arg === '-t' || arg === '--title') {
      options.title = args[++i];
    } else if (arg === '-v' || arg === '--version') {
      options.version = args[++i];
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      options.input = arg;
    }
  }

  return options;
}

function printHelp(): void {
  console.log(`
A2UI Scanner - Generate catalog.json from component JSDoc annotations

Usage:
  a2ui-scan <directory> [options]

Options:
  -o, --output <file>   Output catalog file (default: catalog.json)
  -r, --rules <file>    Also generate rules.txt for LLM prompts
  -t, --title <title>   Catalog title
  -v, --version <ver>   Catalog version
  -h, --help            Show this help

Example:
  a2ui-scan ./src/components -o my-catalog.json -r rules.txt

JSDoc Format:
  Mark components with @a2ui-component tag:

  /**
   * A custom button component
   * @a2ui-component Button
   */
  export function Button({ label, variant }: ButtonProps) { ... }
`);
}

function main(): void {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    printHelp();
    process.exit(1);
  }

  const options = parseArgs(args);
  const inputPath = path.resolve(options.input);

  console.log(`🔍 Scanning ${inputPath}...`);

  const result = scanComponents(inputPath);

  if (result.errors.length > 0) {
    console.warn('\n⚠️  Warnings:');
    result.errors.forEach(err => console.warn(`   ${err}`));
  }

  console.log(`\n✅ Found ${result.components.length} component(s):`);
  result.components.forEach(c => {
    console.log(`   - ${c.name} (${c.properties.length} props)`);
  });

  // Generate catalog
  const catalog = generateCatalog(result, {
    title: options.title,
    version: options.version,
  });

  const outputPath = path.resolve(options.output);
  fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
  console.log(`\n📄 Catalog written to: ${outputPath}`);

  // Generate rules if requested
  if (options.rules) {
    const rules = generateRules(result);
    const rulesPath = path.resolve(options.rules);
    fs.writeFileSync(rulesPath, rules);
    console.log(`📝 Rules written to: ${rulesPath}`);
  }

  console.log('\n🎉 Done!');
}

main();

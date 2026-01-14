#!/usr/bin/env node
/**
 * A2UI Scanner CLI
 * Usage: a2ui-scan ./src/components -o catalog.json
 */

import { scanComponents } from './scanner.js';
import { generateCatalog, generateRules, generateOpenAITools } from './generator.js';
import * as fs from 'fs';
import * as path from 'path';

type OutputFormat = 'a2ui' | 'openai';

interface CliOptions {
  input: string;
  output: string;
  format: OutputFormat;
  rules?: string;
  title?: string;
  version?: string;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    input: '.',
    output: 'catalog.json',
    format: 'a2ui',
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
    } else if (arg === '-f' || arg === '--format') {
      const fmt = args[++i] as OutputFormat;
      if (fmt === 'a2ui' || fmt === 'openai') {
        options.format = fmt;
      } else {
        console.error(`Unknown format: ${fmt}. Use 'a2ui' or 'openai'.`);
        process.exit(1);
      }
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
A2UI Scanner - Generate AI tool definitions from component JSDoc annotations

Usage:
  a2ui-scan <directory> [options]

Options:
  -o, --output <file>   Output file (default: catalog.json)
  -f, --format <type>   Output format: 'a2ui' (default) or 'openai'
  -r, --rules <file>    Also generate rules.txt for LLM prompts
  -t, --title <title>   Catalog title
  -v, --version <ver>   Catalog version
  -h, --help            Show this help

Examples:
  a2ui-scan ./src/components -o my-catalog.json
  a2ui-scan ./src/components -f openai -o tools.json

JSDoc Format:
  Mark components with @a2ui-component tag:

  /**
   * A custom button component
   * @a2ui-component Button
   */
  export function Button({ label, variant }: ButtonProps) { ... }
`);
}

import * as readline from 'readline';

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function runInteractive(): Promise<CliOptions> {
  console.log('\n🔍 A2UI Scanner - Interactive Mode\n');
  
  const input = await prompt('📁 Component directory (default: ./src/components): ') || './src/components';
  const formatChoice = await prompt('📦 Output format [a2ui/openai] (default: a2ui): ') || 'a2ui';
  const format: OutputFormat = formatChoice === 'openai' ? 'openai' : 'a2ui';
  const defaultOutput = format === 'openai' ? 'tools.json' : 'catalog.json';
  const output = await prompt(`💾 Output file (default: ${defaultOutput}): `) || defaultOutput;
  
  return { input, output, format };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  let options: CliOptions;
  
  if (args.length === 0) {
    options = await runInteractive();
  } else if (args[0] === '-h' || args[0] === '--help') {
    printHelp();
    process.exit(0);
  } else {
    options = parseArgs(args);
  }
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

  const outputPath = path.resolve(options.output);

  // Generate output based on format
  if (options.format === 'openai') {
    const tools = generateOpenAITools(result);
    fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
    console.log(`\n🤖 OpenAI tools written to: ${outputPath}`);
  } else {
    const catalog = generateCatalog(result, {
      title: options.title,
      version: options.version,
    });
    fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2));
    console.log(`\n📄 A2UI catalog written to: ${outputPath}`);
  }

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

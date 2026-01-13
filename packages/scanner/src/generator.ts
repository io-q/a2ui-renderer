/**
 * Catalog Generator
 * Transforms scanned components into A2UI v0.9 catalog format
 */

import type { ComponentSchema, ScanResult } from './scanner.js';

export interface CatalogComponent {
  type: 'object';
  description?: string;
  properties: Record<string, CatalogProperty>;
  required?: string[];
}

export interface CatalogProperty {
  type: string;
  description?: string;
  default?: unknown;
}

export interface CatalogOutput {
  $schema: string;
  $id: string;
  title: string;
  version: string;
  components: Record<string, CatalogComponent>;
}

/**
 * Generates an A2UI v0.9 compatible catalog from scan results
 */
export function generateCatalog(
  scanResult: ScanResult,
  options: {
    id?: string;
    title?: string;
    version?: string;
  } = {}
): CatalogOutput {
  const components: Record<string, CatalogComponent> = {};

  for (const component of scanResult.components) {
    const properties: Record<string, CatalogProperty> = {};
    const required: string[] = [];

    for (const prop of component.properties) {
      // Skip internal props
      if (prop.name === 'id' || prop.name === 'component' || prop.name === 'children') {
        continue;
      }

      properties[prop.name] = {
        type: prop.type,
        description: prop.description,
        default: prop.default,
      };

      if (prop.required) {
        required.push(prop.name);
      }
    }

    components[component.name] = {
      type: 'object',
      description: component.description,
      properties,
      required: required.length > 0 ? required : undefined,
    };
  }

  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: options.id || 'https://a2ui.org/custom_catalog.json',
    title: options.title || 'Custom A2UI Component Catalog',
    version: options.version || '0.0.1',
    components,
  };
}

/**
 * Generates rules.txt for LLM prompts
 */
export function generateRules(scanResult: ScanResult): string {
  const lines: string[] = [
    '# A2UI Component Rules',
    '',
    'Available components and their properties:',
    '',
  ];

  for (const component of scanResult.components) {
    lines.push(`## ${component.name}`);
    if (component.description) {
      lines.push(component.description);
    }
    lines.push('');
    lines.push('Properties:');
    
    for (const prop of component.properties) {
      const requiredMarker = prop.required ? ' (required)' : '';
      const description = prop.description ? ` - ${prop.description}` : '';
      lines.push(`- ${prop.name}: ${prop.type}${requiredMarker}${description}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

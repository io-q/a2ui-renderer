/**
 * @a2ui-renderer/scanner
 * CLI tool to generate A2UI catalog.json from JSDoc annotations
 */

export { scanComponents, type ScanResult, type ComponentSchema } from './scanner.js';
export { generateCatalog, type CatalogOutput } from './generator.js';

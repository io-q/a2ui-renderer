/**
 * Component Scanner using ts-morph
 * Parses TypeScript/React components and extracts A2UI metadata from JSDoc
 */

import { Project, SourceFile, FunctionDeclaration, VariableDeclaration, JSDoc, Type } from 'ts-morph';
import * as path from 'path';

export interface PropertySchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description?: string;
  default?: unknown;
}

export interface ComponentSchema {
  name: string;
  description?: string;
  properties: PropertySchema[];
}

export interface ScanResult {
  components: ComponentSchema[];
  errors: string[];
}

/**
 * Maps TypeScript types to A2UI schema types
 */
function mapTsTypeToSchemaType(type: Type): PropertySchema['type'] {
  const typeText = type.getText();
  
  if (type.isBoolean() || typeText === 'boolean') return 'boolean';
  if (type.isNumber() || typeText === 'number') return 'number';
  if (type.isString() || typeText === 'string') return 'string';
  if (type.isArray()) return 'array';
  if (type.isObject()) return 'object';
  
  // Default to string for unknown types
  return 'string';
}

/**
 * Extracts JSDoc tags from a JSDoc comment
 */
function getJsDocTag(jsDocs: JSDoc[], tagName: string): string | undefined {
  for (const jsDoc of jsDocs) {
    const tag = jsDoc.getTags().find(t => t.getTagName() === tagName);
    if (tag) {
      return tag.getCommentText()?.trim();
    }
  }
  return undefined;
}

/**
 * Checks if a function/variable has the @a2ui-component JSDoc tag
 */
function isA2UIComponent(jsDocs: JSDoc[]): boolean {
  return jsDocs.some(doc => 
    doc.getTags().some(tag => tag.getTagName() === 'a2ui-component')
  );
}

/**
 * Gets the component name from @a2ui-component tag or falls back to declaration name
 */
function getComponentName(jsDocs: JSDoc[], declarationName: string): string {
  const tagValue = getJsDocTag(jsDocs, 'a2ui-component');
  return tagValue || declarationName;
}

/**
 * Extracts props from a React component's type annotations
 */
function extractPropsFromFunction(func: FunctionDeclaration): PropertySchema[] {
  const properties: PropertySchema[] = [];
  const params = func.getParameters();
  
  if (params.length === 0) return properties;
  
  // React components typically have props as first parameter
  const propsParam = params[0];
  const propsType = propsParam.getType();
  
  // Get properties from the type
  for (const prop of propsType.getProperties()) {
    const propName = prop.getName();
    const propType = prop.getValueDeclaration()?.getType();
    
    if (!propType) continue;
    
    // Check if optional (has ?)
    const isOptional = prop.isOptional();
    
    properties.push({
      name: propName,
      type: mapTsTypeToSchemaType(propType),
      required: !isOptional,
      description: prop.getJsDocTags().find(t => t.getName() === 'description')?.getText()?.toString(),
    });
  }
  
  return properties;
}

/**
 * Scans a single source file for A2UI components
 */
function scanSourceFile(sourceFile: SourceFile): ComponentSchema[] {
  const components: ComponentSchema[] = [];
  
  // Scan function declarations
  for (const func of sourceFile.getFunctions()) {
    const jsDocs = func.getJsDocs();
    if (!isA2UIComponent(jsDocs)) continue;
    
    const name = getComponentName(jsDocs, func.getName() || 'Unknown');
    const description = jsDocs[0]?.getDescription()?.trim();
    const properties = extractPropsFromFunction(func);
    
    components.push({ name, description, properties });
  }
  
  // Scan variable declarations (arrow functions)
  for (const varStatement of sourceFile.getVariableStatements()) {
    const jsDocs = varStatement.getJsDocs();
    if (!isA2UIComponent(jsDocs)) continue;
    
    for (const decl of varStatement.getDeclarations()) {
      const name = getComponentName(jsDocs, decl.getName());
      const description = jsDocs[0]?.getDescription()?.trim();
      
      // Try to extract props from arrow function
      const initializer = decl.getInitializer();
      const properties: PropertySchema[] = [];
      
      if (initializer?.getKindName() === 'ArrowFunction') {
        const arrowFunc = initializer.asKind(218); // ArrowFunction
        if (arrowFunc) {
          const params = arrowFunc.getParameters();
          if (params.length > 0) {
            const propsType = params[0].getType();
            for (const prop of propsType.getProperties()) {
              const propName = prop.getName();
              const propType = prop.getValueDeclaration()?.getType();
              if (!propType) continue;
              
              properties.push({
                name: propName,
                type: mapTsTypeToSchemaType(propType),
                required: !prop.isOptional(),
              });
            }
          }
        }
      }
      
      components.push({ name, description, properties });
    }
  }
  
  return components;
}

/**
 * Finds tsconfig.json by walking up directories
 */
function findTsConfig(directory: string): string | undefined {
  let current = directory;
  const root = path.parse(current).root;
  
  while (current !== root) {
    const tsConfigPath = path.join(current, 'tsconfig.json');
    if (fs.existsSync(tsConfigPath)) {
      return tsConfigPath;
    }
    current = path.dirname(current);
  }
  return undefined;
}

import * as fs from 'fs';

/**
 * Scans a directory for A2UI components
 */
export function scanComponents(directory: string): ScanResult {
  const tsConfigPath = findTsConfig(directory);
  
  const projectOptions: any = tsConfigPath 
    ? { tsConfigFilePath: tsConfigPath }
    : { 
        compilerOptions: {
          jsx: 2, // React
          esModuleInterop: true,
          strict: true,
        }
      };
  
  projectOptions.skipAddingFilesFromTsConfig = true;
  
  const project = new Project(projectOptions);
  
  // Add source files
  project.addSourceFilesAtPaths([
    path.join(directory, '**/*.tsx'),
    path.join(directory, '**/*.ts'),
  ]);
  
  const components: ComponentSchema[] = [];
  const errors: string[] = [];
  
  for (const sourceFile of project.getSourceFiles()) {
    try {
      const fileComponents = scanSourceFile(sourceFile);
      components.push(...fileComponents);
    } catch (error) {
      errors.push(`Error scanning ${sourceFile.getFilePath()}: ${error}`);
    }
  }
  
  return { components, errors };
}

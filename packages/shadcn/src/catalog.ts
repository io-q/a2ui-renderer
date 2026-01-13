/**
 * ShadCN Component Catalog for A2UI
 * Maps component names to ShadCN implementations
 */

import type { ComponentMap } from '@a2ui-renderer/react';
import { Button } from './components/button';
import { Input } from './components/input';
import { Label } from './components/label';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './components/card';
import { Text } from './components/text';
import { Heading } from './components/heading';
import { Column } from './components/column';
import { Row } from './components/row';

export type ShadcnComponentMap = ComponentMap;

/**
 * Pre-built component map for ShadCN A2UI integration
 */
export const shadcnCatalog: ShadcnComponentMap = {
  // Basic
  Text,
  Heading,
  
  // Inputs
  Button,
  TextField: Input,
  Label,
  
  // Layout
  Column,
  Row,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
};

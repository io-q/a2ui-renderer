/**
 * Utility function for merging Tailwind classes
 * This is the standard ShadCN cn() utility
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import clsx, { type ClassValue } from 'clsx';

/**
 * Tiny wrapper around clsx so component code can `cn('foo', cond && 'bar')`.
 * Pulled out separately because we may swap to tailwind-merge later if
 * className collision becomes a problem.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

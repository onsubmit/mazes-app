import { expect } from 'vitest';

export function assertDefined<T>(value: T | undefined): T {
  expect(value).toBeDefined();
  return value!;
}

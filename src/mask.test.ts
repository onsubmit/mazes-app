import { describe, expect, it } from 'vitest';

import Mask from './mask';

describe('Mask', () => {
  it('Should initialize a basic Mask', () => {
    const mask = new Mask(3, 7);
    expect(mask.count).toBe(21);
  });

  it('Should get and set a location', () => {
    const mask = new Mask(3, 7);
    expect(mask.get(2, 3)).toBe(true);

    mask.set(2, 3, false);
    expect(mask.get(2, 3)).toBe(false);
  });

  it('Should throw when getting an invalid index', () => {
    const mask = new Mask(3, 7);
    expect(() => mask.get(9, 13)).toThrowError('Invalid index: (9, 13)');
  });

  it('Should throw when setting an invalid index', () => {
    const mask = new Mask(3, 7);
    expect(() => mask.set(9, 13, false)).toThrowError('Invalid index: (9, 13)');
  });

  it('Should get and a random on location', () => {
    const mask = new Mask(3, 7);

    const { row, column } = mask.getRandomOnLocation();
    expect(row).toBeGreaterThanOrEqual(0);
    expect(column).toBeGreaterThanOrEqual(0);

    expect(row).toBeLessThan(3);
    expect(column).toBeLessThan(7);

    expect(mask.get(row, column)).toBe(true);
  });
});

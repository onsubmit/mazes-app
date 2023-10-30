import { describe, expect, it, vi } from 'vitest';

import Grid from './grid';
import { assertDefined } from './testHelpers';

describe('Grid', () => {
  it('Should initialize a basic Grid', () => {
    const grid = new Grid(3, 7);
    expect(grid.size).toBe(21);
  });

  it('Should support getting a specific cell', () => {
    const grid = new Grid(5, 5);
    const cell = assertDefined(grid.get(2, 3));

    expect(cell.row).toBe(2);
    expect(cell.column).toBe(3);
  });

  it('Should support getting a random cell', () => {
    const grid = new Grid(5, 5);
    const cell = assertDefined(grid.getRandomCell());

    expect(cell.row).toBeLessThan(5);
    expect(cell.column).toBeLessThan(5);
  });

  it('Should support getting a random cell', () => {
    const grid = new Grid(3, 7);
    const cellCallback = vi.fn();

    grid.forEachCell(cellCallback);
    expect(cellCallback).to.toHaveBeenCalledTimes(21);
  });

  it('Should set up cell neighbors', () => {
    const grid = new Grid(5, 5);

    const cell = assertDefined(grid.get(3, 2));
    const north = assertDefined(grid.get(2, 2));
    const south = assertDefined(grid.get(4, 2));
    const west = assertDefined(grid.get(3, 1));
    const east = assertDefined(grid.get(3, 3));

    expect(cell.north?.row).toBe(north.row);
    expect(cell.north?.column).toBe(north.column);
    expect(cell.south?.row).toBe(south.row);
    expect(cell.south?.column).toBe(south.column);
    expect(cell.west?.row).toBe(west.row);
    expect(cell.west?.column).toBe(west.column);
    expect(cell.east?.row).toBe(east.row);
    expect(cell.east?.column).toBe(east.column);
  });
});

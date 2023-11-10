import { describe, expect, it, vi } from 'vitest';

import CartesianGrid from './cartesianGrid';

describe('Grid', () => {
  it('Should initialize a basic Grid', () => {
    const grid = new CartesianGrid(3, 7);
    expect(grid.rows).toBe(3);
    expect(grid.columns).toBe(7);
    expect(grid.size).toBe(21);
  });

  it('Should support getting a specific cell', () => {
    const grid = new CartesianGrid(5, 5);
    const cell = grid.getOrThrow(2, 3);

    expect(cell.row).toBe(2);
    expect(cell.column).toBe(3);
  });

  it('Should support getting a random cell', () => {
    const grid = new CartesianGrid(5, 5);
    const cell = grid.getRandomCell();

    expect(cell.row).toBeLessThan(5);
    expect(cell.column).toBeLessThan(5);
  });

  it('Should support getting a random cell', () => {
    const grid = new CartesianGrid(3, 7);
    const cellCallback = vi.fn();

    grid.forEachCell(cellCallback);
    expect(cellCallback).to.toHaveBeenCalledTimes(21);
  });

  it('Should not throw when getting a cell outside the grid bounds', () => {
    const grid = new CartesianGrid(5, 5);
    const cell = grid.get(9, 13);
    expect(cell).toBe(undefined);
  });

  it('Should throw when getting a cell outside the grid bounds', () => {
    const grid = new CartesianGrid(5, 5);
    expect(() => grid.getOrThrow(9, 13)).toThrowError('Invalid index: (9, 13)');
  });

  it('Should set up cell neighbors', () => {
    const grid = new CartesianGrid(5, 5);

    const cell = grid.getOrThrow(3, 2);
    const north = grid.getOrThrow(2, 2);
    const south = grid.getOrThrow(4, 2);
    const west = grid.getOrThrow(3, 1);
    const east = grid.getOrThrow(3, 3);

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

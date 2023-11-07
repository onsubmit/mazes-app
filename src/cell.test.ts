import { describe, expect, it } from 'vitest';

import Cell from './cell';

describe('Cell', () => {
  it('Should initialize a basic Cell', () => {
    const cell = new Cell(2, 3);
    expect(cell.row).toBe(2);
    expect(cell.column).toBe(3);
    expect(cell.hasLinks).toBe(false);
    expect(cell.isEmpty).toBe(false);
    expect(cell.links).toHaveLength(0);
    expect(cell.neighbors).toHaveLength(0);
  });

  it('Should support an empty Cell', () => {
    expect(Cell.empty.row).toBe(-1);
    expect(Cell.empty.column).toBe(-1);
    expect(Cell.empty.isEmpty).toBe(true);
  });

  it('Should support linking to other cells', () => {
    const cell = new Cell(5, 5);
    const link = new Cell(4, 5);
    cell.link(link);
    expect(cell.hasLinks).toBe(true);
    expect(cell.links).toHaveLength(1);
    expect(cell.isLinkedTo(link)).toBe(true);
    expect(link.isLinkedTo(cell)).toBe(true);
  });

  it('Should support unidirectional linking to other cells', () => {
    const cell = new Cell(5, 5);
    const link = new Cell(4, 5);
    cell.link(link, { bidi: false });
    expect(cell.hasLinks).toBe(true);
    expect(cell.links).toHaveLength(1);
    expect(cell.isLinkedTo(link)).toBe(true);
    expect(link.isLinkedTo(cell)).toBe(false);
  });

  it('Should support unlinking', () => {
    const cell = new Cell(5, 5);
    const link = new Cell(4, 5);
    cell.link(link);
    expect(cell.hasLinks).toBe(true);
    expect(cell.links).toHaveLength(1);

    cell.unlink(link);
    expect(cell.hasLinks).toBe(false);
    expect(cell.links).toHaveLength(0);
    expect(cell.isLinkedTo(link)).toBe(false);
    expect(link.isLinkedTo(cell)).toBe(false);
  });
});

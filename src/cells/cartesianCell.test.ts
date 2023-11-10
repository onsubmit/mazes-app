import { describe, expect, it } from 'vitest';

import CartesianCell from './cartesianCell';

describe('CartesianCell', () => {
  it('Should initialize a basic CartesianCell', () => {
    const cell = new CartesianCell(2, 3);
    expect(cell.row).toBe(2);
    expect(cell.column).toBe(3);
    expect(cell.hasLinks).toBe(false);
    expect(cell.isEmpty).toBe(false);
    expect(cell.links).toHaveLength(0);
    expect(cell.neighbors).toHaveLength(0);
  });

  it('Should support an empty CartesianCell', () => {
    expect(CartesianCell.empty.isEmpty).toBe(true);
  });

  it('Should support linking to other cells', () => {
    const cell = new CartesianCell(5, 5);
    const link = new CartesianCell(4, 5);
    cell.link(link);
    expect(cell.hasLinks).toBe(true);
    expect(cell.links).toHaveLength(1);
    expect(cell.isLinkedTo(link)).toBe(true);
    expect(link.isLinkedTo(cell)).toBe(true);
  });

  it('Should support unidirectional linking to other cells', () => {
    const cell = new CartesianCell(5, 5);
    const link = new CartesianCell(4, 5);
    cell.link(link, { bidi: false });
    expect(cell.hasLinks).toBe(true);
    expect(cell.links).toHaveLength(1);
    expect(cell.isLinkedTo(link)).toBe(true);
    expect(link.isLinkedTo(cell)).toBe(false);
  });

  it('Should support unlinking', () => {
    const cell = new CartesianCell(5, 5);
    const link = new CartesianCell(4, 5);
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

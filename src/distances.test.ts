import { describe, expect, it } from 'vitest';

import Cell from './cells/cell';
import Distances from './distances';

describe('Distances', () => {
  it('Should initialize a basic Distances', () => {
    const root = new Cell(2, 3);
    const distances = new Distances(root);

    const distance = distances.getOrThrow(root);
    expect(distance).toBe(0);
  });

  it('Should allow for iterating over the cells', () => {
    const root = new Cell(2, 3);
    const distances = new Distances(root);

    for (const cell of distances.cells) {
      expect(cell).toBeDefined();
    }

    const cells = [...distances.cells];
    expect(cells).toHaveLength(1);
    expect(cells[0]).toBe(root);
  });
});

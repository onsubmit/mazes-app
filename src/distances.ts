import Cell from './cell';

type CellNumberMap = Map<Cell, number>;

export default class Distances {
  #root: Cell;
  #cells: CellNumberMap;

  constructor(root: Cell) {
    this.#root = root;
    this.#cells = new Map([[root, 0]]);
  }

  get cells(): IterableIterator<Cell> {
    return this.#cells.keys();
  }

  getOrThrow = (cell: Cell): number => {
    const distance = this.#cells.get(cell);
    if (distance === undefined) {
      throw new Error('Cell not found.');
    }

    return distance;
  };

  has = (cell: Cell): boolean => this.#cells.has(cell);
  set = (cell: Cell, distance: number): CellNumberMap => this.#cells.set(cell, distance);

  getPathTo = (goal: Cell): Distances => {
    let current = goal;

    const breadcrumbs = new Distances(this.#root);
    breadcrumbs.set(current, this.getOrThrow(current));

    while (current !== this.#root) {
      for (const neighbor of current.links) {
        const distanceToNeighbor = this.getOrThrow(neighbor);
        const distanceToCurrent = this.getOrThrow(current);

        if (distanceToNeighbor < distanceToCurrent) {
          breadcrumbs.set(neighbor, distanceToNeighbor);
          current = neighbor;
          break;
        }
      }
    }

    return breadcrumbs;
  };
}

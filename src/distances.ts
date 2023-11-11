import Cell from './cells/cell';

type CellNumberMap<T extends Cell> = Map<T, number>;

export default class Distances<T extends Cell> {
  private _root: T;
  private _cells: CellNumberMap<T>;

  constructor(root: T) {
    this._root = root;
    this._cells = new Map([[root, 0]]);
  }

  get cells(): IterableIterator<T> {
    return this._cells.keys();
  }

  getOrThrow = (cell: T): number => {
    const distance = this._cells.get(cell);
    if (distance === undefined) {
      throw new Error('Cell not found.');
    }

    return distance;
  };

  has = (cell: T): boolean => this._cells.has(cell);
  set = (cell: T, distance: number): CellNumberMap<T> => this._cells.set(cell, distance);

  getPathTo = (goal: T): Distances<T> => {
    let current = goal;

    const breadcrumbs = new Distances<T>(this._root);
    breadcrumbs.set(current, this.getOrThrow(current));

    while (current !== this._root) {
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

  getFurthestCell = (): { cell: T; distance: number } => {
    let maxDistance = 0;
    let maxCell = this._root;

    for (const [cell, distance] of this._cells.entries()) {
      if (distance > maxDistance) {
        maxCell = cell;
        maxDistance = distance;
      }
    }

    return { cell: maxCell, distance: maxDistance };
  };
}

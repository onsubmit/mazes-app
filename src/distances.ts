import Cell from './cell';

type CellNumberMap = Map<Cell, number>;

export default class Distances {
  #cells: CellNumberMap;

  constructor(root: Cell) {
    this.#cells = new Map([[root, 0]]);
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

  get cells(): IterableIterator<Cell> {
    return this.#cells.keys();
  }
}

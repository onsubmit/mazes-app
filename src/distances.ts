import Cell from './cell';

type CellNumberMap = Map<Cell, number>;

export default class Distances {
  #cells: CellNumberMap;

  constructor(root: Cell) {
    this.#cells = new Map([[root, 0]]);
  }

  get = (cell: Cell): number | undefined => this.#cells.get(cell);
  set = (cell: Cell, distance: number): CellNumberMap => this.#cells.set(cell, distance);

  get cells(): IterableIterator<Cell> {
    return this.#cells.keys();
  }
}

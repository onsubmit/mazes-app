import Cell from './cell';
import Distances from './distances';
import Grid from './grid';

export default class DistanceGrid extends Grid {
  #distances: Distances | undefined;

  constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  override getCellContents = (cell: Cell): string => {
    if (this.#distances?.has(cell)) {
      return this.#distances.getOrThrow(cell).toString(36).toUpperCase();
    }

    return super.getCellContents(cell);
  };

  setPathStart = (cell: Cell) => {
    this.#distances = cell.distances;
  };

  setPathEnd = (cell: Cell) => {
    this.#distances = this.#distances?.getPathTo(cell);
  };
}

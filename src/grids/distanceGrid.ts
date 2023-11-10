import Cell from '../cells/cell';
import Distances from '../distances';
import Grid from './grid';

export default class DistanceGrid extends Grid {
  protected distances: Distances | undefined;

  constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  override getCellContents(cell: Cell): string {
    if (this.distances?.has(cell)) {
      return this.distances.getOrThrow(cell).toString(36).toUpperCase();
    }

    return super.getCellContents(cell);
  }

  onSetDistances(_distances: Distances): void {}

  setPathStart = (cell: Cell) => {
    this.distances = cell.distances;
    this.onSetDistances(this.distances);
  };

  setPathEnd = (cell: Cell) => {
    if (!this.distances) {
      throw new Error('Path start not set yet.');
    }

    this.distances = this.distances.getPathTo(cell);
    this.onSetDistances(this.distances);
  };
}

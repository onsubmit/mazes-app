import CartesianCell from '../cells/cartesianCell';
import Distances from '../distances';
import CartesianGrid from './cartesianGrid';

export default class DistanceGrid extends CartesianGrid {
  protected distances: Distances<CartesianCell> | undefined;

  constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  override getCellContents(cell: CartesianCell): string {
    if (this.distances?.has(cell)) {
      return this.distances.getOrThrow(cell).toString(36).toUpperCase();
    }

    return super.getCellContents(cell);
  }

  onSetDistances(_distances: Distances<CartesianCell>): void {}

  setPathStart = (cell: CartesianCell) => {
    this.distances = cell.getDistances();
    this.onSetDistances(this.distances);
  };

  setPathEnd = (cell: CartesianCell) => {
    if (!this.distances) {
      throw new Error('Path start not set yet.');
    }

    this.distances = this.distances.getPathTo(cell);
    this.onSetDistances(this.distances);
  };
}

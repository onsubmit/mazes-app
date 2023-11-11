import CartesianCell from '../cells/cartesianCell';
import Distances from '../distances';
import CartesianGrid from './cartesianGrid';
import DistanceGrid from './distanceGrid';

export default class CartesianDistanceGrid
  extends CartesianGrid
  implements DistanceGrid<CartesianCell>
{
  distances: Distances<CartesianCell> | undefined;

  protected constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  static override create = (rows: number, columns: number): CartesianDistanceGrid =>
    new this(rows, columns).build();

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

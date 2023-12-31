import PolarCell from '../cells/polarCell';
import Distances from '../distances';
import DistanceGrid from './distanceGrid';
import PolarGrid from './polarGrid';

export default class PolarDistanceGrid extends PolarGrid implements DistanceGrid<PolarCell> {
  distances: Distances<PolarCell> | undefined;

  override getCellContents(cell: PolarCell): string {
    if (this.distances?.has(cell)) {
      return this.distances.getOrThrow(cell).toString().toUpperCase();
    }

    return super.getCellContents(cell);
  }

  onSetDistances(_distances: Distances<PolarCell>): void {}

  setPathStart = (cell: PolarCell) => {
    this.distances = cell.getDistances();
    this.onSetDistances(this.distances);
  };

  setPathEnd = (cell: PolarCell) => {
    if (!this.distances) {
      throw new Error('Path start not set yet.');
    }

    this.distances = this.distances.getPathTo(cell);
    this.onSetDistances(this.distances);
  };
}

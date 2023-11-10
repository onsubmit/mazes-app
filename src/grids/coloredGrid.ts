import CartesianCell from '../cells/cartesianCell';
import Cell from '../cells/cell';
import Distances from '../distances';
import DistanceGrid from './distanceGrid';

export default class ColoredGrid extends DistanceGrid {
  #myDistances: Distances<CartesianCell> | undefined;
  #farthest: Cell | undefined;
  #maximum: number | undefined;

  constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  override onSetDistances(distances: Distances<CartesianCell>): void {
    this.#myDistances = distances;
    const { cell, distance } = distances.getFurthestCell();
    this.#farthest = cell;
    this.#maximum = distance;
  }

  override getCellBackgroundColor(cell: CartesianCell): string | void {
    if (!this.#myDistances?.has(cell)) {
      return;
    }

    if (this.#farthest === undefined) {
      throw new Error('Farthest not determined yet.');
    }

    if (this.#maximum === undefined) {
      throw new Error('Maximum not determined yet.');
    }

    const distance = this.#myDistances.getOrThrow(cell);
    const intensity = (this.#maximum - distance) / this.#maximum;
    const dark = Math.round(255 * intensity);
    const bright = Math.round(128 + 127 * intensity);
    return `rgb(${dark}, ${dark}, ${bright})`;
  }
}

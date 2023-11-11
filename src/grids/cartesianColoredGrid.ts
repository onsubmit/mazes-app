import CartesianCell from '../cells/cartesianCell';
import Cell from '../cells/cell';
import Distances from '../distances';
import CartesianDistanceGrid from './cartesianDistanceGrid';

export default class CartesianColoredGrid extends CartesianDistanceGrid {
  private _distances: Distances<CartesianCell> | undefined;
  #farthest: Cell | undefined;
  #maximum: number | undefined;

  private constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  static override create = (rows: number, columns: number): CartesianColoredGrid =>
    new this(rows, columns).build();

  override onSetDistances(distances: Distances<CartesianCell>): void {
    this._distances = distances;
    const { cell, distance } = distances.getFurthestCell();
    this.#farthest = cell;
    this.#maximum = distance;
  }

  override getCellBackgroundColor(cell: CartesianCell): string | void {
    if (!this._distances?.has(cell)) {
      return;
    }

    if (this.#farthest === undefined) {
      throw new Error('Farthest not determined yet.');
    }

    if (this.#maximum === undefined) {
      throw new Error('Maximum not determined yet.');
    }

    const distance = this._distances.getOrThrow(cell);
    const intensity = (this.#maximum - distance) / this.#maximum;
    const dark = Math.round(255 * intensity);
    const bright = Math.round(128 + 127 * intensity);
    return `rgb(${dark}, ${dark}, ${bright})`;
  }
}

import CartesianCell from '../cells/cartesianCell';
import Cell from '../cells/cell';
import Distances from '../distances';
import CartesianDistanceGrid from './cartesianDistanceGrid';

export default class CartesianColoredGrid extends CartesianDistanceGrid {
  private _distances: Distances<CartesianCell> | undefined;
  private _farthest: Cell | undefined;
  private _maximum: number | undefined;

  private constructor(rows: number, columns: number) {
    super(rows, columns);
  }

  static override create = (rows: number, columns: number): CartesianColoredGrid =>
    new this(rows, columns).build();

  override onSetDistances(distances: Distances<CartesianCell>): void {
    this._distances = distances;
    const { cell, distance } = distances.getFurthestCell();
    this._farthest = cell;
    this._maximum = distance;
  }

  override getCellBackgroundColor(cell: CartesianCell): string | void {
    if (!this._distances?.has(cell)) {
      return;
    }

    if (this._farthest === undefined) {
      throw new Error('Farthest not determined yet.');
    }

    if (this._maximum === undefined) {
      throw new Error('Maximum not determined yet.');
    }

    const distance = this._distances.getOrThrow(cell);
    const intensity = (this._maximum - distance) / this._maximum;
    const dark = Math.round(255 * intensity);
    const bright = Math.round(128 + 127 * intensity);
    return `rgb(${dark}, ${dark}, ${bright})`;
  }
}

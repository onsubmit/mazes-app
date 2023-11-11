import PolarCell from '../cells/polarCell';
import Distances from '../distances';
import PolarDistanceGrid from './polarDistanceGrid';

export default class PolarColoredGrid extends PolarDistanceGrid {
  private _distances: Distances<PolarCell> | undefined;
  #farthest: PolarCell | undefined;
  #maximum: number | undefined;

  private constructor(rows: number) {
    super(rows);
  }

  static override create = (rows: number): PolarColoredGrid => new this(rows).build();

  override onSetDistances(distances: Distances<PolarCell>): void {
    this._distances = distances;
    const { cell, distance } = distances.getFurthestCell();
    this.#farthest = cell;
    this.#maximum = distance;
  }

  override getCellBackgroundColor(cell: PolarCell): string | void {
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
    const r = Math.round(32 + 10 * intensity);
    const g = Math.round(32 + 96 * intensity);
    const b = Math.round(32 + 223 * intensity);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

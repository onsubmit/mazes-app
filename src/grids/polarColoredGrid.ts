import PolarCell from '../cells/polarCell';
import Distances from '../distances';
import PolarDistanceGrid from './polarDistanceGrid';

export default class PolarColoredGrid extends PolarDistanceGrid {
  #distances: Distances<PolarCell> | undefined;
  #farthest: PolarCell | undefined;
  #maximum: number | undefined;

  private constructor(rows: number) {
    super(rows);
  }

  static override create = (rows: number): PolarColoredGrid => new this(rows).build();

  override onSetDistances(distances: Distances<PolarCell>): void {
    this.#distances = distances;
    const { cell, distance } = distances.getFurthestCell();
    this.#farthest = cell;
    this.#maximum = distance;
  }

  override getCellBackgroundColor(cell: PolarCell): string | void {
    if (!this.#distances?.has(cell)) {
      return;
    }

    if (this.#farthest === undefined) {
      throw new Error('Farthest not determined yet.');
    }

    if (this.#maximum === undefined) {
      throw new Error('Maximum not determined yet.');
    }

    const distance = this.#distances.getOrThrow(cell);
    const intensity = (this.#maximum - distance) / this.#maximum;
    const dark = Math.round(255 * intensity);
    const bright = Math.round(128 + 127 * intensity);
    return `rgb(${dark}, ${dark}, ${bright})`;
  }
}

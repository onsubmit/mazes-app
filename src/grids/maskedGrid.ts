import Cell from '../cells/cell';
import Mask from '../mask';
import Grid from './grid';

export default class MaskedGrid extends Grid {
  #mask: Mask;

  constructor(mask: Mask) {
    super(mask.rows, mask.columns, (r, c) => (mask.get(r, c) ? new Cell(r, c) : Cell.empty));
    this.#mask = mask;
  }

  override get size(): number {
    return this.#mask.count;
  }

  override getRandomCell(): Cell {
    const { row, column } = this.#mask.getRandomOnLocation();
    return this.getOrThrow(row, column);
  }
}

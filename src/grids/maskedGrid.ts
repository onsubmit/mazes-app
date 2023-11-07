import Cell from '../cell';
import Mask from '../mask';
import Grid, { Row } from './grid';

export default class MaskedGrid extends Grid {
  #mask: Mask;

  constructor(mask: Mask) {
    super(mask.rows, mask.columns);
    this.#mask = mask;
  }

  override get size(): number {
    return this.#mask.count;
  }

  protected override prepareGrid(): Row[] {
    const grid: Array<Row> = [];
    for (let r = 0; r < this._rows; r++) {
      const row: Row = [];
      for (let c = 0; c < this._columns; c++) {
        row.push(this.#mask.get(r, c) ? new Cell(r, c) : Cell.empty);
      }

      grid.push(row);
    }

    return grid;
  }

  override getRandomCell(): Cell {
    const { row, column } = this.#mask.getRandomOnLocation();
    return this.getOrThrow(row, column);
  }
}

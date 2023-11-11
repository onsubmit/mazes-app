import CartesianCell from '../cells/cartesianCell';
import Mask from '../mask';
import CartesianGrid from './cartesianGrid';
import { Row } from './grid';

export default class MaskedGrid extends CartesianGrid {
  private _mask: Mask;

  private constructor(mask: Mask) {
    super(mask.rows, mask.columns);
    this._mask = mask;
  }

  static override create = (rows: number, columns: number): CartesianGrid =>
    new this(new Mask(rows, columns)).build();

  static createFromMask = (mask: Mask): MaskedGrid => new this(mask).build();

  override get size(): number {
    return this._mask.count;
  }

  protected override prepareGrid(): Array<Row<CartesianCell>> {
    const grid: Array<Row<CartesianCell>> = [];
    for (let r = 0; r < this._rows; r++) {
      const row: Row<CartesianCell> = [];
      for (let c = 0; c < this._columns; c++) {
        row.push(this._mask.get(r, c) ? new CartesianCell(r, c) : CartesianCell.empty);
      }

      grid.push(row);
    }

    return grid;
  }

  override getRandomCell(): CartesianCell {
    const { row, column } = this._mask.getRandomOnLocation();
    return this.getOrThrow(row, column);
  }
}

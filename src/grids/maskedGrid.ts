import CartesianCell from '../cells/cartesianCell';
import Mask from '../mask';
import CartesianGrid from './cartesianGrid';

export default class MaskedGrid extends CartesianGrid {
  #mask: Mask;

  constructor(mask: Mask) {
    super(mask.rows, mask.columns, (r, c) =>
      mask.get(r, c) ? new CartesianCell(r, c) : CartesianCell.empty
    );
    this.#mask = mask;
  }

  override get size(): number {
    return this.#mask.count;
  }

  override getRandomCell(): CartesianCell {
    const { row, column } = this.#mask.getRandomOnLocation();
    return this.getOrThrow(row, column);
  }
}

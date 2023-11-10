import Cell from './cell';

export default class PolarCell extends Cell {
  #clockWise?: PolarCell;
  #counterClockwise?: PolarCell;
  #inward?: PolarCell;
  #outward: Array<PolarCell>;

  constructor(row: number, column: number) {
    super(row, column);
    this.#outward = [];
  }

  get neighbors(): PolarCell[] {
    return [this.#clockWise, this.#counterClockwise, this.#inward, ...this.#outward].filter(
      Boolean
    );
  }
}

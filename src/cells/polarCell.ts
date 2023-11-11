import Cell from './cell';

export default class PolarCell extends Cell {
  readonly outward: Array<PolarCell>;

  clockwise?: PolarCell;
  counterClockwise?: PolarCell;
  inward?: PolarCell;

  constructor(row: number, column: number) {
    super(row, column);
    this.outward = [];
  }

  override getNeighbors<T extends Cell>(): T[] {
    return [this.clockwise, this.counterClockwise, this.inward, ...this.outward].filter(
      Boolean
    ) as unknown as T[];
  }
}

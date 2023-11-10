import Cell from './cell';

export default class CartesianCell extends Cell {
  north?: CartesianCell;
  south?: CartesianCell;
  west?: CartesianCell;
  east?: CartesianCell;

  constructor(row: number, column: number) {
    super(row, column);
  }

  static empty = CartesianCell.getEmptyCell();

  private static getEmptyCell() {
    const empty = new CartesianCell(-1, -1);
    empty._isEmpty = true;
    return empty;
  }

  get neighbors(): CartesianCell[] {
    return [this.north, this.south, this.east, this.west].filter(Boolean);
  }
}

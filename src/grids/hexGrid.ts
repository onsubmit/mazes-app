import HexCell from '../cells/hexCell';
import { isEven } from '../math';
import Grid, { Row } from './grid';

export default class HexGrid extends Grid<HexCell> {
  private static _fromCoordinates = (row: number, column: number) => new HexCell(row, column);

  private constructor(rows: number, columns: number) {
    super(rows, columns, HexGrid._fromCoordinates);
  }

  static create = (rows: number, columns: number): HexGrid => new this(rows, columns).build();

  protected override prepareGrid(): Row<HexCell>[] {
    const grid: Array<Row<HexCell>> = [];
    for (let r = 0; r < this._rows; r++) {
      const row: Row<HexCell> = [];
      for (let c = 0; c < this._columns; c++) {
        row.push(this._getInitialCellValue(r, c));
      }

      grid.push(row);
    }

    return grid;
  }

  protected override configureCells(): void {
    this.forEachCell(({ row, column, cell }) => {
      const isEvenRow = isEven(row);
      const northDiagonal = isEvenRow ? row - 1 : row;
      const southDiagonal = isEvenRow ? row : row + 1;

      cell.northWest = this.get(northDiagonal, column - 1);
      cell.north = this.get(row - 1, column);
      cell.northEast = this.get(northDiagonal, column + 1);
      cell.southWest = this.get(southDiagonal, column - 1);
      cell.south = this.get(row + 1, column);
      cell.southEast = this.get(southDiagonal, column + 1);
    });
  }

  override getCellBackgroundColor(_cell: HexCell): string | void {
    throw new Error('Method not implemented.');
  }

  override draw(_canvas: HTMLCanvasElement, _cellSize: number): void {
    throw new Error('Method not implemented.');
  }

  override toString(): string {
    throw new Error('Method not implemented.');
  }
}

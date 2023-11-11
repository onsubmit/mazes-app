import Cell from '../cells/cell';
import { randomInteger } from '../random';

export type Row<T extends Cell> = Array<T>;
export type GetInitialCellValueCallback<T extends Cell> = (row: number, column: number) => T;
export type CellCallback<T extends Cell> = (input: {
  row: number;
  column: number;
  cell: T;
}) => boolean | void;
export type RowCallback<T extends Cell> = (row: Row<T>) => boolean | void;

export default abstract class Grid<T extends Cell> {
  private _grid: Array<Row<T>> = [];

  protected _rows: number;
  protected _columns: number;
  protected _getInitialCellValue: GetInitialCellValueCallback<T>;

  constructor(rows: number, columns: number, getInitialCellValue: GetInitialCellValueCallback<T>) {
    this._rows = rows;
    this._columns = columns;
    this._getInitialCellValue = getInitialCellValue;
  }

  protected build = (): this => {
    this._grid = this.prepareGrid();
    this.configureCells();
    return this;
  };

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  get size(): number {
    return this._rows * this._columns;
  }

  getCellContents(_cell: T): string {
    return ' ';
  }

  protected abstract configureCells(): void;

  protected abstract prepareGrid(): Array<Row<T>>;

  abstract getCellBackgroundColor(_cell: T): string | void;

  abstract draw(canvas: HTMLCanvasElement, cellSize: number): void;

  abstract toString(): string;

  get(row: number, column: number): T | undefined {
    return this._grid[row]?.[column];
  }

  getOrThrow = (row: number, column: number): T => {
    const cell = this.get(row, column);
    if (!cell) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return cell;
  };

  getRow = (row: number): Row<T> | undefined => this._grid[row];

  getRowOrThrow = (row: number): Row<T> => {
    const r = this._grid[row];
    if (!r) {
      throw new Error(`Invalid row: (${row})`);
    }

    return r;
  };

  getRandomCell(): T {
    const row = randomInteger(this._rows);
    const column = randomInteger(this._columns);
    return this.getOrThrow(row, column);
  }

  forEachCell(cb: CellCallback<T>) {
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._columns; c++) {
        const cell = this.getOrThrow(r, c);
        if (cb({ row: r, column: c, cell }) === false) {
          return;
        }
      }
    }
  }

  forEachRow = (cb: RowCallback<T>) => {
    for (let r = 0; r < this._rows; r++) {
      if (cb(this.getRowOrThrow(r)) === false) {
        return;
      }
    }
  };

  getDeadends = (): Array<T> => {
    const deadends: Array<T> = [];

    this.forEachCell(({ cell }) => {
      if (cell?.links.length === 1) {
        deadends.push(cell);
      }
    });

    return deadends;
  };
}

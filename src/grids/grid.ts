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
  #getInitialCellValue: GetInitialCellValueCallback<T>;
  #grid: Array<Row<T>>;

  protected _rows: number;
  protected _columns: number;

  constructor(rows: number, columns: number, getInitialCellValue: GetInitialCellValueCallback<T>) {
    this._rows = rows;
    this._columns = columns;

    this.#getInitialCellValue = getInitialCellValue;
    this.#grid = this.#prepareGrid();

    this.configureCells();
  }

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

  abstract getCellBackgroundColor(_cell: T): string | void;

  abstract draw(canvas: HTMLCanvasElement, cellSize: number): void;

  abstract toString(): string;

  get = (row: number, column: number): T | undefined => this.#grid[row]?.[column];

  getOrThrow = (row: number, column: number): T => {
    const cell = this.get(row, column);
    if (!cell) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return cell;
  };

  getRandomCell(): T {
    const row = randomInteger(this._rows);
    const column = randomInteger(this._columns);
    return this.getOrThrow(row, column);
  }

  forEachCell = (cb: CellCallback<T>) => {
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._columns; c++) {
        const cell = this.getOrThrow(r, c);
        if (cb({ row: r, column: c, cell }) === false) {
          return;
        }
      }
    }
  };

  forEachRow = (cb: RowCallback<T>) => {
    for (let r = 0; r < this._rows; r++) {
      if (cb(this.#grid[r]!) === false) {
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

  #prepareGrid = () => {
    const grid: Array<Row<T>> = [];
    for (let r = 0; r < this._rows; r++) {
      const row: Row<T> = [];
      for (let c = 0; c < this._columns; c++) {
        row.push(this.#getInitialCellValue(r, c));
      }

      grid.push(row);
    }

    return grid;
  };
}

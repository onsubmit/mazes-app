import Cell from './cell';
import { randomInteger } from './random';

export type Row = Array<Cell>;
export type CellCallback = (cell: Cell) => void;
export type RowCallback = (row: Row) => void;

export default class Grid {
  #rows: number;
  #columns: number;
  #grid: Array<Row>;

  constructor(rows: number, columns: number) {
    this.#rows = rows;
    this.#columns = columns;
    this.#grid = this.#prepareGrid();
    this.#configureCells();
  }

  get rows(): number {
    return this.#rows;
  }

  get columns(): number {
    return this.#columns;
  }

  get size(): number {
    return this.#rows * this.#columns;
  }

  get = (row: number, column: number): Cell | undefined => this.#grid[row]?.[column];

  getOrThrow = (row: number, column: number): Cell => {
    const cell = this.get(row, column);
    if (!cell) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return cell;
  };

  getRandomCell = (): Cell => {
    const row = randomInteger(this.#rows);
    const column = randomInteger(this.#columns);
    return this.getOrThrow(row, column);
  };

  getCellContents = (_cell: Cell): string => ' ';

  forEachCell = (cb: CellCallback) => {
    for (let r = 0; r < this.#rows; r++) {
      for (let c = 0; c < this.#columns; c++) {
        const cell = this.getOrThrow(r, c);
        cb(cell);
      }
    }
  };

  forEachRow = (cb: RowCallback) => {
    for (let r = 0; r < this.#rows; r++) {
      cb(this.#grid[r]!);
    }
  };

  toString = (): string => {
    const lines: string[] = [];
    lines.push(`+${'---+'.repeat(this.#columns)}`);

    for (let r = 0; r < this.#rows; r++) {
      let top = '|';
      let bottom = '+';

      for (let c = 0; c < this.#columns; c++) {
        const cell = this.getOrThrow(r, c);
        const eastBoundary = cell.isLinkedTo(cell.east) ? ' ' : '|';
        top = [top, this.getCellContents(cell), eastBoundary].join(' ');

        const southBoundary = cell?.isLinkedTo(cell?.south) ? '   ' : '---';
        bottom = `${bottom}${southBoundary}+`;
      }

      lines.push(top);
      lines.push(bottom);
    }

    return lines.join('\n');
  };

  #prepareGrid = () => {
    const grid: Array<Row> = [];
    for (let r = 0; r < this.#rows; r++) {
      const row: Row = [];
      for (let c = 0; c < this.#columns; c++) {
        row.push(new Cell(r, c));
      }

      grid.push(row);
    }

    return grid;
  };

  #configureCells = () => {
    for (let r = 0; r < this.#rows; r++) {
      for (let c = 0; c < this.#columns; c++) {
        const cell = this.getOrThrow(r, c);
        const { row, column } = cell;

        cell.north = this.get(row - 1, column);
        cell.south = this.get(row + 1, column);
        cell.west = this.get(row, column - 1);
        cell.east = this.get(row, column + 1);
      }
    }
  };
}

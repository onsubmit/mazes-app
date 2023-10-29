import Cell from './cell';
import { randomInteger } from './random';

export default class Grid {
  #rows: number;
  #columns: number;
  #grid: Array<Array<Cell>>;

  constructor(rows: number, columns: number) {
    this.#rows = rows;
    this.#columns = columns;
    this.#grid = this.#prepareGrid();
    this.#configureCells();
  }

  get size(): number {
    return this.#rows * this.#columns;
  }

  get = (row: number, column: number): Cell | undefined => this.#grid[row]?.[column];

  getRandomCell = (): Cell => {
    const row = randomInteger(this.#rows);
    const column = randomInteger(this.#columns);
    return this.#getOrThrow(row, column);
  };

  #prepareGrid = () => {
    const grid: Array<Array<Cell>> = [];
    for (let r = 0; r < this.#rows; r++) {
      const row: Array<Cell> = [];
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
        const cell = this.#getOrThrow(r, c);
        const { row, column } = cell;

        cell.north = this.get(row - 1, column);
        cell.south = this.get(row + 1, column);
        cell.west = this.get(row, column - 1);
        cell.east = this.get(row, column + 1);
      }
    }
  };

  #getOrThrow = (row: number, column: number): Cell => {
    const cell = this.get(row, column);
    if (!cell) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return cell;
  };
}
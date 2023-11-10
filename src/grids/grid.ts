import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import Cell from '../cell';
import { randomInteger } from '../random';

export type Row = Array<Cell>;
export type GetInitialCellValueCallback = (row: number, column: number) => Cell;
export type CellCallback = (input: { row: number; column: number; cell: Cell }) => boolean | void;
export type RowCallback = (row: Row) => boolean | void;

export default class Grid {
  #getInitialCellValue: GetInitialCellValueCallback;
  #grid: Array<Row>;

  protected _rows: number;
  protected _columns: number;

  constructor(
    rows: number,
    columns: number,
    getInitialCellValue: GetInitialCellValueCallback = (r, c) => new Cell(r, c)
  ) {
    this._rows = rows;
    this._columns = columns;

    this.#getInitialCellValue = getInitialCellValue;
    this.#grid = this.#prepareGrid();

    this.#configureCells();
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

  getCellContents(_cell: Cell): string {
    return ' ';
  }

  getCellBackgroundColor(_cell: Cell): string | void {}

  draw(canvas: HTMLCanvasElement, cellSize: number): void {
    const backgroundColor = '#fff';
    const backgroundColorEmptyCell = '#000';
    const strokeStyle = '#000';

    const helper = new CanvasRenderingContextHelper(canvas, backgroundColor, strokeStyle);

    for (const mode of ['backgrounds', 'walls'] as const) {
      this.forEachCell(({ row, column, cell }) => {
        const x1 = column * cellSize;
        const y1 = row * cellSize;
        const x2 = (column + 1) * cellSize;
        const y2 = (row + 1) * cellSize;

        switch (mode) {
          case 'backgrounds': {
            const color = cell.isEmpty
              ? backgroundColorEmptyCell
              : this.getCellBackgroundColor(cell) ?? backgroundColor;
            helper.drawRectangle(x1, y1, x2, y2, color);

            break;
          }
          case 'walls': {
            if (!cell.north) {
              helper.drawLine(x1, y1, x2, y1);
            }

            if (!cell.west) {
              helper.drawLine(x1, y1, x1, y2);
            }

            if (!cell.isLinkedTo(cell.east)) {
              helper.drawLine(x2, y1, x2, y2);
            }

            if (!cell.isLinkedTo(cell.south)) {
              helper.drawLine(x1, y2, x2, y2);
            }

            break;
          }
        }
      });
    }
  }

  get = (row: number, column: number): Cell | undefined => this.#grid[row]?.[column];

  getOrThrow = (row: number, column: number): Cell => {
    const cell = this.get(row, column);
    if (!cell) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return cell;
  };

  getRandomCell(): Cell {
    const row = randomInteger(this._rows);
    const column = randomInteger(this._columns);
    return this.getOrThrow(row, column);
  }

  forEachCell = (cb: CellCallback) => {
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._columns; c++) {
        const cell = this.getOrThrow(r, c);
        if (cb({ row: r, column: c, cell }) === false) {
          return;
        }
      }
    }
  };

  forEachRow = (cb: RowCallback) => {
    for (let r = 0; r < this._rows; r++) {
      if (cb(this.#grid[r]!) === false) {
        return;
      }
    }
  };

  getDeadends = (): Array<Cell> => {
    const deadends: Array<Cell> = [];

    this.forEachCell(({ cell }) => {
      if (cell?.links.length === 1) {
        deadends.push(cell);
      }
    });

    return deadends;
  };

  toString = (): string => {
    const lines: string[] = [];
    lines.push(`+${'---+'.repeat(this._columns)}`);

    for (let r = 0; r < this._rows; r++) {
      let top = '|';
      let bottom = '+';

      for (let c = 0; c < this._columns; c++) {
        const cell = this.getOrThrow(r, c);
        const eastBoundary = cell?.isLinkedTo(cell.east) ? ' ' : '|';
        top = [top, this.getCellContents(cell), eastBoundary].join(' ');

        const southBoundary = cell?.isLinkedTo(cell.south) ? '   ' : '---';
        bottom = `${bottom}${southBoundary}+`;
      }

      lines.push(top);
      lines.push(bottom);
    }

    return lines.join('\n');
  };

  #prepareGrid = () => {
    const grid: Array<Row> = [];
    for (let r = 0; r < this._rows; r++) {
      const row: Row = [];
      for (let c = 0; c < this._columns; c++) {
        row.push(this.#getInitialCellValue(r, c));
      }

      grid.push(row);
    }

    return grid;
  };

  #configureCells = () => {
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this._columns; c++) {
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

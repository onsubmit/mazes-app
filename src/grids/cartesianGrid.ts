import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import CartesianCell from '../cells/cartesianCell';
import Grid, { GetInitialCellValueCallback } from './grid';

export default class CartesianGrid extends Grid<CartesianCell> {
  constructor(
    rows: number,
    columns: number,
    getInitialCellValue: GetInitialCellValueCallback<CartesianCell> = (row, column) =>
      new CartesianCell(row, column)
  ) {
    super(rows, columns, getInitialCellValue);
  }

  override getCellBackgroundColor(_cell: CartesianCell): string | void {}

  override toString(): string {
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
  }

  override draw(canvas: HTMLCanvasElement, cellSize: number): void {
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

  protected override configureCells() {
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
  }
}

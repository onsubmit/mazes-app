import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import TriangleCell from '../cells/triangleCell';
import { sqrt3 } from '../math';
import Grid, { Row } from './grid';

export default class TriangleGrid extends Grid<TriangleCell> {
  private static _fromCoordinates = (row: number, column: number) => new TriangleCell(row, column);

  private constructor(rows: number, columns: number) {
    super(rows, columns, TriangleGrid._fromCoordinates);
  }

  static create = (rows: number, columns: number): TriangleGrid => new this(rows, columns).build();

  protected override prepareGrid(): Row<TriangleCell>[] {
    const grid: Array<Row<TriangleCell>> = [];
    for (let r = 0; r < this._rows; r++) {
      const row: Row<TriangleCell> = [];
      for (let c = 0; c < this._columns; c++) {
        row.push(this._getInitialCellValue(r, c));
      }

      grid.push(row);
    }

    return grid;
  }

  protected override configureCells(): void {
    this.forEachCell(({ row, column, cell }) => {
      cell.west = this.get(row, column - 1);
      cell.east = this.get(row, column + 1);

      if (cell.isUpright) {
        cell.south = this.get(row + 1, column);
      } else {
        cell.north = this.get(row - 1, column);
      }
    });
  }
  override getCellBackgroundColor(_cell: TriangleCell): string | void {
    return '#fff';
  }

  override draw(canvas: HTMLCanvasElement, cellSize: number): void {
    const backgroundColor = '#fff';
    const backgroundColorEmptyCell = '#000';
    const strokeStyle = '#000';

    const halfWidth = cellSize / 2;
    const height = (cellSize * sqrt3) / 2;
    const halfHeight = height / 2;

    canvas.width = Math.ceil((cellSize * (this.columns + 1)) / 2) + 1;
    canvas.height = Math.ceil(height * this.rows) + 1;

    const helper = new CanvasRenderingContextHelper(canvas, backgroundColor, strokeStyle);

    for (const mode of ['backgrounds', 'walls'] as const) {
      this.forEachCell(({ row, column, cell }) => {
        const centerX = halfWidth + column * halfWidth;
        const centerY = halfHeight + row * height;

        const westX = Math.floor(centerX - halfWidth);
        const midX = Math.floor(centerX);
        const eastX = Math.floor(centerX + halfWidth);

        const apexY = Math.floor(cell.isUpright ? centerY - halfHeight : centerY + halfHeight);
        const baseY = Math.floor(cell.isUpright ? centerY + halfHeight : centerY - halfHeight);

        switch (mode) {
          case 'backgrounds': {
            const color = cell.isEmpty
              ? backgroundColorEmptyCell
              : this.getCellBackgroundColor(cell) ?? backgroundColor;

            helper.fillPath((context) => {
              context.moveTo(westX, baseY);
              context.lineTo(midX, apexY);
              context.lineTo(eastX, baseY);
            }, color);
            break;
          }
          case 'walls': {
            if (!cell.west) {
              helper.drawLine(westX, baseY, midX, apexY);
            }

            if (!cell.isLinkedTo(cell.east)) {
              helper.drawLine(eastX, baseY, midX, apexY);
            }

            const { isUpright } = cell;
            if ((isUpright && !cell.south) || (!isUpright && !cell.isLinkedTo(cell.north))) {
              helper.drawLine(eastX, baseY, westX, baseY);
            }

            break;
          }
        }
      });
    }
  }

  override toString(): string {
    throw new Error('Method not implemented.');
  }
}

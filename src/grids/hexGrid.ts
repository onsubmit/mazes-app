import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import HexCell from '../cells/hexCell';
import { isEven, isOdd, sqrt3 } from '../math';
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
    return '#fff';
  }

  override draw(canvas: HTMLCanvasElement, cellSize: number): void {
    const backgroundColor = '#fff';
    const backgroundColorEmptyCell = '#000';
    const strokeStyle = '#000';

    const sizeA = cellSize / 2;
    const sizeB = (cellSize * sqrt3) / 2;
    //const width = cellSize * 2;
    const height = sizeB * 2;

    canvas.width = Math.ceil(3 * sizeA * this.columns + sizeA) + 1;
    canvas.height = Math.ceil(height * this.rows + sizeB) + 1;

    const helper = new CanvasRenderingContextHelper(canvas, backgroundColor, strokeStyle);

    for (const mode of ['backgrounds', 'walls'] as const) {
      this.forEachCell(({ row, column, cell }) => {
        const centerX = cellSize + 3 * column * sizeA;
        const centerY = sizeB + row * height + (isOdd(column) ? sizeB : 0);

        const farWestX = Math.floor(centerX - cellSize);
        const nearWestX = Math.floor(centerX - sizeA);
        const nearEastX = Math.floor(centerX + sizeA);
        const farEastX = Math.floor(centerX + cellSize);

        const northY = Math.floor(centerY - sizeB);
        const middleY = Math.floor(centerY);
        const southY = Math.floor(centerY + sizeB);

        switch (mode) {
          case 'backgrounds': {
            const color = cell.isEmpty
              ? backgroundColorEmptyCell
              : this.getCellBackgroundColor(cell) ?? backgroundColor;

            helper.fillPath((context) => {
              context.moveTo(farWestX, middleY);
              context.lineTo(nearWestX, northY);
              context.lineTo(nearEastX, northY);
              context.lineTo(farEastX, middleY);
              context.lineTo(nearEastX, southY);
              context.lineTo(nearWestX, southY);
            }, color);
            break;
          }
          case 'walls': {
            if (!cell.southWest) {
              helper.drawLine(farWestX, middleY, nearWestX, southY);
            }

            if (!cell.northWest) {
              helper.drawLine(farWestX, middleY, nearWestX, northY);
            }

            if (!cell.north) {
              helper.drawLine(nearWestX, northY, nearEastX, northY);
            }

            if (!cell.isLinkedTo(cell.northEast)) {
              helper.drawLine(nearEastX, northY, farEastX, middleY);
            }

            if (!cell.isLinkedTo(cell.southEast)) {
              helper.drawLine(farEastX, middleY, nearEastX, southY);
            }

            if (!cell.isLinkedTo(cell.south)) {
              helper.drawLine(nearEastX, southY, nearWestX, southY);
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

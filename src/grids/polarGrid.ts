import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import PolarCell from '../cells/polarCell';
import { cos, modulo, sin, twoPi } from '../math';
import { randomInteger } from '../random';
import Grid, { CellCallback, Row } from './grid';

export default class PolarGrid extends Grid<PolarCell> {
  static #fromCoordinates = (row: number, column: number) => new PolarCell(row, column);

  private constructor(rows: number) {
    super(rows, 1, PolarGrid.#fromCoordinates);
  }

  static create = (rows: number): PolarGrid => new this(rows).build();

  protected override prepareGrid(): Row<PolarCell>[] {
    const rows: Array<Row<PolarCell>> = [[new PolarCell(0, 0)]];
    const rowHeight = 1 / this._rows;

    for (let r = 1; r < this._rows; r++) {
      const radius = r / this._rows;
      const circumference = twoPi * radius;

      const previousCount = rows[r - 1]?.length ?? -1;
      const estimatedCellWidth = circumference / previousCount;
      const ratio = Math.round(estimatedCellWidth / rowHeight);

      const cells = previousCount * ratio;
      const row = Array.from({ length: cells }, (_, c) => new PolarCell(r, c));
      rows.push(row);
    }

    return rows;
  }

  protected override configureCells(): void {
    this.forEachCell(({ row, column, cell }) => {
      if (row === 0) {
        return;
      }

      cell.clockwise = this.get(row, column + 1);
      cell.counterClockwise = this.get(row, column - 1);

      const currentRow = this.getRowOrThrow(row);
      const previousRow = this.getRowOrThrow(row - 1);
      const ratio = currentRow.length / previousRow.length;
      const parent = this.getOrThrow(row - 1, Math.floor(column / ratio));
      parent.outward.push(cell);
      cell.inward = parent;
    });
  }

  override get(row: number, column: number): PolarCell | undefined {
    if (row < 0 || row >= this._rows) {
      return;
    }

    const r = this.getRow(row);
    return r?.[modulo(column, r?.length)];
  }

  override getCellBackgroundColor(_cell: PolarCell): string | void {
    throw new Error('Method not implemented.');
  }

  override toString(): string {
    throw new Error('Method not implemented.');
  }

  override getRandomCell(): PolarCell {
    const row = randomInteger(this._rows);
    const column = randomInteger(this.getRowOrThrow(row).length);
    return this.getOrThrow(row, column);
  }

  override forEachCell(cb: CellCallback<PolarCell>) {
    for (let r = 0; r < this._rows; r++) {
      for (let c = 0; c < this.getRowOrThrow(r).length; c++) {
        const cell = this.get(r, c);
        if (!cell) {
          continue;
        }

        if (cb({ row: r, column: c, cell }) === false) {
          return;
        }
      }
    }
  }

  override draw(canvas: HTMLCanvasElement, cellSize: number) {
    const backgroundColor = '#fff';
    const strokeStyle = '#000';

    const size = 2 * this.rows * cellSize;
    canvas.width = size + 1;
    canvas.height = size + 1;

    const helper = new CanvasRenderingContextHelper(canvas, backgroundColor, strokeStyle);

    const center = size / 2;
    this.forEachCell(({ row, column, cell }) => {
      if (row === 0) {
        return;
      }

      const theta = twoPi / this.getRowOrThrow(row).length;
      const innerRadius = row * cellSize;
      const outerRadius = innerRadius + cellSize;
      const thetaCounterClockwise = column * theta;
      const thetaClockwise = thetaCounterClockwise + theta;

      const pointA = {
        x: center + Math.floor(innerRadius * cos(thetaCounterClockwise)),
        y: center + Math.floor(innerRadius * sin(thetaCounterClockwise)),
      };

      // const pointB = {
      //   x: center + Math.floor(outerRadius * cos(thetaCounterClockwise)),
      //   y: center + Math.floor(outerRadius * sin(thetaCounterClockwise)),
      // };

      const pointC = {
        x: center + Math.floor(innerRadius * cos(thetaClockwise)),
        y: center + Math.floor(innerRadius * sin(thetaClockwise)),
      };

      const pointD = {
        x: center + Math.floor(outerRadius * cos(thetaClockwise)),
        y: center + Math.floor(outerRadius * sin(thetaClockwise)),
      };

      if (!cell.isLinkedTo(cell.inward)) {
        helper.drawLine(pointA.x, pointA.y, pointC.x, pointC.y);
      }

      if (!cell.isLinkedTo(cell.clockwise)) {
        helper.drawLine(pointC.x, pointC.y, pointD.x, pointD.y);
      }
    });

    helper.drawCircle(center, center, this.rows * cellSize);
  }
}

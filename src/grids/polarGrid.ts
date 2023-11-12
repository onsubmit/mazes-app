import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import PolarCell from '../cells/polarCell';
import { cos, modulo, sin, twoPi } from '../math';
import { randomInteger } from '../random';
import Grid, { CellCallback, Row } from './grid';

type Coordinate = { x: number; y: number };

type CellDrawData = {
  coordinates: {
    a: Coordinate;
    b: Coordinate;
    c: Coordinate;
    d: Coordinate;
  };
  innerRadius: number;
  outerRadius: number;
  thetaCounterClockwise: number;
  thetaClockwise: number;
};

export default class PolarGrid extends Grid<PolarCell> {
  private static _fromCoordinates = (row: number, column: number) => new PolarCell(row, column);

  protected constructor(rows: number) {
    super(rows, 1, PolarGrid._fromCoordinates);
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
        const cell = this.getOrThrow(r, c);
        if (cb({ row: r, column: c, cell }) === false) {
          return;
        }
      }
    }
  }

  override draw(canvas: HTMLCanvasElement, cellSize: number) {
    const backgroundColor = '#fff';
    const backgroundColorEmptyCell = '#000';
    const strokeStyle = '#000';

    const size = 2 * this.rows * cellSize;
    canvas.width = size + 1;
    canvas.height = size + 1;

    const helper = new CanvasRenderingContextHelper(canvas, backgroundColor, strokeStyle);

    const center = size / 2;

    helper.fillCircle(
      center,
      center,
      cellSize,
      this.getCellBackgroundColor(this.getOrThrow(0, 0)) ?? backgroundColor
    );

    const cellCorners: Map<PolarCell, CellDrawData> = new Map();

    for (const mode of ['precalculate', 'backgrounds', 'walls', 'text'] as const) {
      this.forEachCell(({ row, column, cell }) => {
        if (row === 0) {
          return;
        }

        const corners = cellCorners.get(cell);

        switch (mode) {
          case 'precalculate': {
            const theta = twoPi / this.getRowOrThrow(row).length;
            const innerRadius = row * cellSize;
            const outerRadius = innerRadius + cellSize;
            const thetaCounterClockwise = column * theta;
            const thetaClockwise = thetaCounterClockwise + theta;

            const cosThetaCounterClockwise = cos(thetaCounterClockwise);
            const sinThetaCounterClockwise = sin(thetaCounterClockwise);
            const cosThetaClockwise = cos(thetaClockwise);
            const sinThetaClockwise = sin(thetaClockwise);

            const a = {
              x: center + Math.round(innerRadius * cosThetaCounterClockwise),
              y: center + Math.round(innerRadius * sinThetaCounterClockwise),
            };

            const b = {
              x: center + Math.round(outerRadius * cosThetaCounterClockwise),
              y: center + Math.round(outerRadius * sinThetaCounterClockwise),
            };

            const c = {
              x: center + Math.round(innerRadius * cosThetaClockwise),
              y: center + Math.round(innerRadius * sinThetaClockwise),
            };

            const d = {
              x: center + Math.round(outerRadius * cosThetaClockwise),
              y: center + Math.round(outerRadius * sinThetaClockwise),
            };

            cellCorners.set(cell, {
              coordinates: { a, b, c, d },
              innerRadius,
              outerRadius,
              thetaCounterClockwise,
              thetaClockwise,
            });

            break;
          }
          case 'backgrounds': {
            if (!corners) {
              throw new Error('Cell corners not precalculated.');
            }

            const {
              coordinates: { a, b, d },
              innerRadius,
              outerRadius,
              thetaCounterClockwise,
              thetaClockwise,
            } = corners;

            const color = cell.isEmpty
              ? backgroundColorEmptyCell
              : this.getCellBackgroundColor(cell) ?? backgroundColor;

            helper.fillPath((context) => {
              context.moveTo(a.x, a.y);
              context.arc(center, center, innerRadius, thetaCounterClockwise, thetaClockwise);
              context.lineTo(d.x, d.y);
              context.moveTo(b.x, b.y);
              context.arc(center, center, outerRadius, thetaCounterClockwise, thetaClockwise);
              context.moveTo(b.x, b.y);
              context.lineTo(a.x, a.y);
            }, color);

            helper.fillPath((context) => {
              context.lineTo(b.x, b.y);
              context.lineTo(d.x, d.y);
              context.lineTo(a.x, a.y);
            }, color);

            break;
          }
          case 'walls': {
            if (!corners) {
              throw new Error('Cell corners not precalculated.');
            }

            const {
              coordinates: { a, c, d },
              innerRadius,
              thetaCounterClockwise,
              thetaClockwise,
            } = corners;

            if (!cell.isLinkedTo(cell.inward)) {
              helper.context.moveTo(a.x, a.y);
              helper.context.arc(
                center,
                center,
                innerRadius,
                thetaCounterClockwise,
                thetaClockwise
              );
              helper.context.moveTo(a.x, a.y);
              helper.context.stroke();
            }

            if (!cell.isLinkedTo(cell.clockwise)) {
              helper.drawLine(c.x, c.y, d.x, d.y);
            }

            break;
          }
          case 'text': {
            if (!corners) {
              throw new Error('Cell corners not precalculated.');
            }

            const {
              coordinates: { a, d },
            } = corners;
            helper.fillText(
              (a.x + d.x - cellSize / 2) / 2,
              (a.y + d.y + cellSize / 4) / 2,
              this.getCellContents(cell),
              '#ffffff55'
            );
            break;
          }
        }
      });

      helper.drawCircle(center, center, this.rows * cellSize);
    }
  }
}

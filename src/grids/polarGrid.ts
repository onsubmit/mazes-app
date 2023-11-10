import CanvasRenderingContextHelper from '../canvasRenderingContextHelper';
import { cos, sin, twoPi } from '../math';
import CartesianGrid from './cartesianGrid';

export default class PolarGrid extends CartesianGrid {
  override draw(canvas: HTMLCanvasElement, cellSize: number) {
    const backgroundColor = '#fff';
    const strokeStyle = '#000';

    const size = 2 * this.rows * cellSize;
    canvas.width = size + 1;
    canvas.height = size + 1;

    const helper = new CanvasRenderingContextHelper(canvas, backgroundColor, strokeStyle);

    const center = size / 2;
    this.forEachCell(({ row, column, cell }) => {
      const theta = twoPi / this.columns;
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

      if (!cell.isLinkedTo(cell.north)) {
        helper.drawLine(pointA.x, pointA.y, pointC.x, pointC.y);
      }

      if (!cell.isLinkedTo(cell.east)) {
        helper.drawLine(pointC.x, pointC.y, pointD.x, pointD.y);
      }
    });

    helper.drawCircle(center, center, this.rows * cellSize);
  }
}

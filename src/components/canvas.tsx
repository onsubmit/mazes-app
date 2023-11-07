import { useEffect, useRef } from 'react';

import Grid from '../grids/grid';

type CanvasProps = {
  grid: Grid;
  cellSize?: number;
};

export default function Canvas({ grid, cellSize = 32 }: CanvasProps) {
  const width = cellSize * grid.columns + 1;
  const height = cellSize * grid.rows + 1;

  const backgroundColor = '#fff';
  const strokeStyle = '#000';

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const canvas = ref.current;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get rendering context');
    }

    context.fillStyle = backgroundColor;
    context.strokeStyle = strokeStyle;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };

    const drawRectangle = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      context.fillStyle = color;
      context.fillRect(x1, y1, x2, y2);
      context.fillStyle = backgroundColor;
    };

    for (const mode of ['backgrounds', 'walls'] as const) {
      grid.forEachCell((cell) => {
        const x1 = cell.column * cellSize;
        const y1 = cell.row * cellSize;
        const x2 = (cell.column + 1) * cellSize;
        const y2 = (cell.row + 1) * cellSize;

        switch (mode) {
          case 'backgrounds': {
            const color = grid.getCellBackgroundColor(cell);
            if (color) {
              drawRectangle(x1, y1, x2, y2, color);
            }

            break;
          }
          case 'walls': {
            if (!cell.north) {
              drawLine(x1, y1, x2, y1);
            }

            if (!cell.west) {
              drawLine(x1, y1, x1, y2);
            }

            if (!cell.isLinkedTo(cell.east)) {
              drawLine(x2, y1, x2, y2);
            }

            if (!cell.isLinkedTo(cell.south)) {
              drawLine(x1, y2, x2, y2);
            }

            break;
          }
        }
      });
    }
  }, [cellSize, grid, ref]);

  return <canvas ref={ref} width={width} height={height}></canvas>;
}

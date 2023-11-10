import { useEffect, useRef } from 'react';

import Cell from '../cells/cell';
import Grid from '../grids/grid';

type CanvasProps<T extends Cell> = {
  grid: Grid<T>;
  cellSize?: number;
};

export default function Canvas<T extends Cell>({ grid, cellSize = 32 }: CanvasProps<T>) {
  const width = cellSize * grid.columns + 1;
  const height = cellSize * grid.rows + 1;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    grid.draw(canvasRef.current, cellSize);
  }, [cellSize, grid, canvasRef]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

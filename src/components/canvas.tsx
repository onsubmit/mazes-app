import { useEffect, useRef } from 'react';

import Grid from '../grids/grid';

type CanvasProps = {
  grid: Grid;
  cellSize?: number;
};

export default function Canvas({ grid, cellSize = 32 }: CanvasProps) {
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

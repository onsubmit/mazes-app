import Cell from '../../cells/cell';
import Grid from '../../grids/grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class RecursiveBacktracker implements MazeGenerator {
  execute = <TCell extends Cell, TGrid extends Grid<TCell>>(
    grid: TGrid,
    startAt = grid.getRandomCell()
  ): TGrid => {
    const stack = [startAt];

    while (stack.length > 0) {
      const current = stack.at(-1)!;
      const neighbors = current.getNeighbors<TCell>().filter((n) => !n.hasLinks);

      if (neighbors.length === 0) {
        stack.pop();
      } else {
        const neighbor = sample(neighbors);
        current.link(neighbor);
        stack.push(neighbor);
      }
    }

    return grid;
  };
}

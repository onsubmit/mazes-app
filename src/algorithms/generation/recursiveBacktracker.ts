import CartesianGrid from '../../grids/cartesianGrid';
import { sample } from '../../random';
import { MazeGeneratorCartesianGrid } from './mazeGenerator';

export default class RecursiveBacktracker implements MazeGeneratorCartesianGrid {
  execute = <TGrid extends CartesianGrid>(grid: TGrid, startAt = grid.getRandomCell()): TGrid => {
    const stack = [startAt];

    while (stack.length > 0) {
      const current = stack.at(-1)!;
      const neighbors = current.neighbors.filter((n) => !n.hasLinks);

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

import Grid from '../../grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class RecursiveBacktracker implements MazeGenerator {
  execute = <T extends Grid>(grid: T, startAt = grid.getRandomCell()): T => {
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

import Cell from '../../cell';
import Grid from '../../grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class Wilsons implements MazeGenerator {
  execute = <T extends Grid>(grid: T): T => {
    const unvisited: Set<Cell> = new Set();
    grid.forEachCell((cell) => {
      unvisited.add(cell);
    });

    const first = sample(unvisited);
    unvisited.delete(first);

    while (unvisited.size > 0) {
      let cell = sample(unvisited);
      let path = [cell];

      while (unvisited.has(cell)) {
        cell = sample(cell.neighbors);
        const position = path.indexOf(cell);
        if (position > 0) {
          path = path.slice(0, position);
        } else {
          path.push(cell);
        }
      }

      for (let i = 0; i < path.length - 1; i++) {
        path[i]!.link(path[i + 1]);
        unvisited.delete(path[i]!);
      }
    }

    return grid;
  };
}

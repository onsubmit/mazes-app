import Grid from '../../grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class AldousBroder implements MazeGenerator {
  execute = <T extends Grid>(grid: T): T => {
    let cell = grid.getRandomCell();
    let numUnvisited = grid.size - 1;

    while (numUnvisited > 0) {
      const neighbor = sample(cell.neighbors);

      if (!neighbor.hasLinks) {
        cell.link(neighbor);
        numUnvisited--;
      }

      cell = neighbor;
    }

    return grid;
  };
}

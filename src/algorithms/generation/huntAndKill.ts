import Cell from '../../cell';
import Grid from '../../grids/grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class HuntAndKill implements MazeGenerator {
  execute = <T extends Grid>(grid: T): T => {
    let current: Cell | null = grid.getRandomCell();

    while (current) {
      const unvisitedNeighbors: Cell[] = current.neighbors.filter((n) => !n.hasLinks);

      if (unvisitedNeighbors.length > 0) {
        const neighbor = sample(unvisitedNeighbors);
        current.link(neighbor);
        current = neighbor;
      } else {
        current = null;

        grid.forEachCell((cell) => {
          const visitedNeighbors = cell.neighbors.filter((n) => n.hasLinks);
          if (!cell.hasLinks && visitedNeighbors.length > 0) {
            current = cell;

            const neighbor = sample(visitedNeighbors);
            current.link(neighbor);
            return false;
          }
        });
      }
    }

    return grid;
  };
}

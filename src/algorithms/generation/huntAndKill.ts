import CartesianCell from '../../cells/cartesianCell';
import CartesianGrid from '../../grids/cartesianGrid';
import { sample } from '../../random';
import { MazeGeneratorCartesianGrid } from './mazeGenerator';

export default class HuntAndKill implements MazeGeneratorCartesianGrid {
  execute = <TGrid extends CartesianGrid>(grid: TGrid): TGrid => {
    let current: CartesianCell | null = grid.getRandomCell();

    while (current) {
      const unvisitedNeighbors: CartesianCell[] = current.neighbors.filter((n) => !n.hasLinks);

      if (unvisitedNeighbors.length > 0) {
        const neighbor = sample(unvisitedNeighbors);
        current.link(neighbor);
        current = neighbor;
      } else {
        current = null;

        grid.forEachCell(({ cell }) => {
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

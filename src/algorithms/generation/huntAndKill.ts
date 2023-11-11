import CartesianCell from '../../cells/cartesianCell';
import Cell from '../../cells/cell';
import Grid from '../../grids/grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class HuntAndKill implements MazeGenerator {
  execute = <TCell extends Cell, TGrid extends Grid<TCell>>(grid: TGrid): TGrid => {
    let current: CartesianCell | null = grid.getRandomCell();

    while (current) {
      const unvisitedNeighbors: CartesianCell[] = current.getNeighbors().filter((n) => !n.hasLinks);

      if (unvisitedNeighbors.length > 0) {
        const neighbor = sample(unvisitedNeighbors);
        current.link(neighbor);
        current = neighbor;
      } else {
        current = null;

        grid.forEachCell(({ cell }) => {
          const visitedNeighbors = cell.getNeighbors().filter((n) => n.hasLinks);
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

import CartesianGrid from '../../grids/cartesianGrid';
import { sample } from '../../random';
import { MazeGeneratorCartesianGrid } from './mazeGenerator';

export default class AldousBroder implements MazeGeneratorCartesianGrid {
  execute = <TGrid extends CartesianGrid>(grid: TGrid): TGrid => {
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

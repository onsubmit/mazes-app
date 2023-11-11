import Cell from '../../cells/cell';
import Grid from '../../grids/grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class AldousBroder implements MazeGenerator {
  execute = <TCell extends Cell, TGrid extends Grid<TCell>>(grid: TGrid): TGrid => {
    let cell = grid.getRandomCell();
    let numUnvisited = grid.size - 1;

    while (numUnvisited > 0) {
      const neighbor = sample(cell.getNeighbors<TCell>());

      if (!neighbor.hasLinks) {
        cell.link(neighbor);
        numUnvisited--;
      }

      cell = neighbor;
    }

    return grid;
  };
}

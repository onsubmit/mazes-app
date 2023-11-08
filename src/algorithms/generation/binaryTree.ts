import Grid from '../../grids/grid';
import { randomInteger } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class BinaryTree implements MazeGenerator {
  execute = <T extends Grid>(grid: T): T => {
    grid.forEachCell(({ cell }) => {
      const neighbors = [cell.north, cell.east].filter(Boolean);
      const index = randomInteger(neighbors.length);
      cell.link(neighbors[index]);
    });

    return grid;
  };
}

import Cell from '../../cell';
import Grid from '../../grid';
import { randomInteger } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class BinaryTree implements MazeGenerator {
  execute = <T extends Grid>(grid: T): T => {
    grid.forEachCell((cell: Cell) => {
      const neighbors = [cell.north, cell.east].filter(Boolean);
      const index = randomInteger(neighbors.length);
      cell.link(neighbors[index]);
    });

    return grid;
  };
}

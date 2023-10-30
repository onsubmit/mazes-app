import Cell from '../../cell';
import Grid from '../../grid';
import { randomInteger } from '../../random';

export default class BinaryTree {
  static execute = (grid: Grid): Grid => {
    grid.forEachCell((cell: Cell) => {
      const neighbors = [cell.north, cell.east].filter(Boolean);
      const index = randomInteger(neighbors.length);
      cell.link(neighbors[index]);
    });

    return grid;
  };
}

import CartesianGrid from '../../grids/cartesianGrid';
import { randomInteger } from '../../random';
import { MazeGeneratorCartesianGrid } from './mazeGenerator';

export default class BinaryTree implements MazeGeneratorCartesianGrid {
  execute = <TGrid extends CartesianGrid>(grid: TGrid): TGrid => {
    grid.forEachCell(({ cell }) => {
      const neighbors = [cell.north, cell.east].filter(Boolean);
      const index = randomInteger(neighbors.length);
      cell.link(neighbors[index]);
    });

    return grid;
  };
}

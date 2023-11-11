import CartesianCell from '../../cells/cartesianCell';
import Grid from '../../grids/grid';
import { randomInteger } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class BinaryTree implements MazeGenerator {
  execute = <TCell extends CartesianCell, TGrid extends Grid<TCell>>(grid: TGrid): TGrid => {
    grid.forEachCell(({ cell }) => {
      const neighbors = [cell.north, cell.east].filter(Boolean);
      const index = randomInteger(neighbors.length);
      cell.link(neighbors[index]);
    });

    return grid;
  };
}

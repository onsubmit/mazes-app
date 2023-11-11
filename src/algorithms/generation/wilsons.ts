import CartesianCell from '../../cells/cartesianCell';
import Cell from '../../cells/cell';
import Grid from '../../grids/grid';
import { sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class Wilsons implements MazeGenerator {
  execute = <TCell extends Cell, TGrid extends Grid<TCell>>(grid: TGrid): TGrid => {
    const unvisited: Set<CartesianCell> = new Set();
    grid.forEachCell(({ cell }) => {
      unvisited.add(cell);
    });

    const first = sample(unvisited);
    unvisited.delete(first);

    while (unvisited.size > 0) {
      let cell = sample(unvisited);
      let path = [cell];

      while (unvisited.has(cell)) {
        cell = sample(cell.getNeighbors());
        const position = path.indexOf(cell);
        if (position > 0) {
          path = path.slice(0, position);
        } else {
          path.push(cell);
        }
      }

      for (let i = 0; i < path.length - 1; i++) {
        path[i]!.link(path[i + 1]);
        unvisited.delete(path[i]!);
      }
    }

    return grid;
  };
}

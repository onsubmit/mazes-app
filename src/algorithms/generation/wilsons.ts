import CartesianCell from '../../cells/cartesianCell';
import CartesianGrid from '../../grids/cartesianGrid';
import { sample } from '../../random';
import { MazeGeneratorCartesianGrid } from './mazeGenerator';

export default class Wilsons implements MazeGeneratorCartesianGrid {
  execute = <TGrid extends CartesianGrid>(grid: TGrid): TGrid => {
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
        cell = sample(cell.neighbors);
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

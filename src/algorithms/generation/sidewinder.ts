import CartesianCell from '../../cells/cartesianCell';
import Grid from '../../grids/grid';
import { randomBoolean, sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class Sidewinder implements MazeGenerator {
  execute = <TCell extends CartesianCell, TGrid extends Grid<TCell>>(grid: TGrid): TGrid => {
    grid.forEachRow((row) => {
      const run: Set<CartesianCell> = new Set();

      for (const cell of row) {
        run.add(cell);

        const atEasternBoundary = !cell.east;
        const atNorthernBoundary = !cell.north;

        const shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && randomBoolean());
        if (shouldCloseOut) {
          const member = sample(run);
          member.link(member.north);
          run.clear();
        } else {
          cell.link(cell.east);
        }
      }
    });

    return grid;
  };
}

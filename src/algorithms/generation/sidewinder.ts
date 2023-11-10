import CartesianCell from '../../cells/cartesianCell';
import CartesianGrid from '../../grids/cartesianGrid';
import { randomBoolean, sample } from '../../random';
import { MazeGeneratorCartesianGrid } from './mazeGenerator';

export default class Sidewinder implements MazeGeneratorCartesianGrid {
  execute = <TGrid extends CartesianGrid>(grid: TGrid): TGrid => {
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

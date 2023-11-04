import Cell from '../../cell';
import Grid, { Row } from '../../grid';
import { randomBoolean, sample } from '../../random';
import MazeGenerator from './mazeGenerator';

export default class Sidewinder implements MazeGenerator {
  execute = <T extends Grid>(grid: T): T => {
    grid.forEachRow((row: Row) => {
      const run: Set<Cell> = new Set();

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

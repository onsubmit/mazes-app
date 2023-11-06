import Cell from '../../cell';
import Grid from '../../grid';

export default interface MazeGenerator {
  execute: <T extends Grid>(grid: T, startAt?: Cell) => T;
}

import Cell from '../../cells/cell';
import Grid from '../../grids/grid';

export default interface MazeGenerator {
  execute: <T extends Grid>(grid: T, startAt?: Cell) => T;
}

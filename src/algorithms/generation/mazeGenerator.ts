import Cell from '../../cells/cell';
import Grid from '../../grids/grid';

export default interface MazeGenerator {
  execute: <TCell extends Cell, TGrid extends Grid<TCell>>(grid: TGrid, startAt?: TCell) => TGrid;
}

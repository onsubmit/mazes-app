import CartesianCell from '../../cells/cartesianCell';
import Cell from '../../cells/cell';
import CartesianGrid from '../../grids/cartesianGrid';
import Grid from '../../grids/grid';

export type MazeGeneratorCartesianGrid = MazeGenerator<CartesianCell, CartesianGrid>;

export default interface MazeGenerator<TCell extends Cell, TGrid extends Grid<TCell>> {
  execute: (grid: TGrid, startAt?: TCell) => TGrid;
}

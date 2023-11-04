import Grid from '../../grid';

export default interface MazeGenerator {
  execute: (grid: Grid) => Grid;
}

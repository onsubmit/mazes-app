import Cell from '../cells/cell';
import Distances from '../distances';

export default interface DistanceGrid<T extends Cell> {
  distances: Distances<T> | undefined;
  setPathStart: (cell: T) => void;
  setPathEnd: (cell: T) => void;
}

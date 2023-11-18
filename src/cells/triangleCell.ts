import { isEven } from '../math';
import CartesianCell from './cartesianCell';
import Cell from './cell';

export default class TriangleCell extends CartesianCell {
  get isUpright(): boolean {
    return isEven(this.row + this.column);
  }

  override getNeighbors<T extends Cell>(): T[] {
    return [this.west, this.east, this.isUpright ? this.south : this.north].filter(Boolean) as T[];
  }
}

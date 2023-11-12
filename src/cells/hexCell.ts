import CartesianCell from './cartesianCell';
import Cell from './cell';

export default class HexCell extends CartesianCell {
  northEast?: HexCell;
  northWest?: HexCell;
  southEast?: HexCell;
  southWest?: HexCell;

  override getNeighbors<T extends Cell>(): T[] {
    return [
      this.northWest,
      this.north,
      this.northEast,
      this.southWest,
      this.south,
      this.southEast,
    ].filter(Boolean) as T[];
  }
}

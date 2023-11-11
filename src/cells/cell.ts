import Distances from '../distances';

export default abstract class Cell {
  private _row: number;
  private _column: number;
  private _links: Set<this>;

  protected _isEmpty = false;

  constructor(row: number, column: number) {
    this._row = row;
    this._column = column;
    this._links = new Set();
  }

  get row(): number {
    return this._row;
  }

  get column(): number {
    return this._column;
  }

  get links(): this[] {
    return [...this._links.keys()];
  }

  get isEmpty(): boolean {
    return this._isEmpty;
  }

  get hasLinks(): boolean {
    return this._links.size > 0;
  }

  abstract getNeighbors<T extends Cell>(): T[];

  getDistances<T extends Cell>(this: T): Distances<T> {
    const distances = new Distances(this);
    let frontier: Set<T> = new Set([this]);

    while (frontier.size) {
      const newFrontier: Set<T> = new Set();

      for (const cell of frontier) {
        for (const linked of cell.links) {
          if (distances.has(linked)) {
            continue;
          }

          distances.set(linked, distances.getOrThrow(cell) + 1);
          newFrontier.add(linked);
        }
      }

      frontier = newFrontier;
    }

    return distances;
  }

  link<T extends Cell>(this: T, cell: T | undefined, options = { bidi: true }): T {
    if (!cell) {
      return this;
    }

    this._links.add(cell);
    if (options.bidi) {
      cell.link(this, { bidi: false });
    }

    return this;
  }

  unlink<T extends Cell>(this: T, cell: T, options = { bidi: true }): T {
    this._links.delete(cell);
    if (options.bidi) {
      cell.unlink(this, { bidi: false });
    }

    return this;
  }

  isLinkedTo<T extends Cell>(this: T, cell: T | undefined): boolean {
    return cell ? this._links.has(cell) : false;
  }
}

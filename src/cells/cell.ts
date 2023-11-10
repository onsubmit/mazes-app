import Distances from '../distances';

export default abstract class Cell {
  #row: number;
  #column: number;
  #links: Set<this>;

  protected _isEmpty = false;

  constructor(row: number, column: number) {
    this.#row = row;
    this.#column = column;
    this.#links = new Set();
  }

  get row(): number {
    return this.#row;
  }

  get column(): number {
    return this.#column;
  }

  get links(): this[] {
    return [...this.#links.keys()];
  }

  get isEmpty(): boolean {
    return this._isEmpty;
  }

  get hasLinks(): boolean {
    return this.#links.size > 0;
  }

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

    this.#links.add(cell);
    if (options.bidi) {
      cell.link(this, { bidi: false });
    }

    return this;
  }

  unlink<T extends Cell>(this: T, cell: T, options = { bidi: true }): T {
    this.#links.delete(cell);
    if (options.bidi) {
      cell.unlink(this, { bidi: false });
    }

    return this;
  }

  isLinkedTo<T extends Cell>(this: T, cell: T | undefined): boolean {
    return cell ? this.#links.has(cell) : false;
  }
}

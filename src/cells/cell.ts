import Distances from '../distances';

export default class Cell {
  #row: number;
  #column: number;
  #links: Set<Cell>;
  #isEmpty = false;

  north?: Cell;
  south?: Cell;
  west?: Cell;
  east?: Cell;

  constructor(row: number, column: number) {
    this.#row = row;
    this.#column = column;
    this.#links = new Set();
  }

  static empty = Cell.getEmptyCell();

  private static getEmptyCell() {
    const empty = new Cell(-1, -1);
    empty.#isEmpty = true;
    return empty;
  }

  get row(): number {
    return this.#row;
  }

  get column(): number {
    return this.#column;
  }

  get links(): Cell[] {
    return [...this.#links.keys()];
  }

  get isEmpty(): boolean {
    return this.#isEmpty;
  }

  get hasLinks(): boolean {
    return this.#links.size > 0;
  }

  get neighbors(): Cell[] {
    return [this.north, this.south, this.east, this.west].filter(Boolean);
  }

  get distances(): Distances {
    const distances = new Distances(this);
    let frontier: Set<Cell> = new Set([this]);

    while (frontier.size) {
      const newFrontier: Set<Cell> = new Set();

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

  link = (cell: Cell | undefined, options = { bidi: true }): this => {
    if (!cell) {
      return this;
    }

    this.#links.add(cell);
    if (options.bidi) {
      cell.link(this, { bidi: false });
    }

    return this;
  };

  unlink = (cell: Cell, options = { bidi: true }): this => {
    this.#links.delete(cell);
    if (options.bidi) {
      cell.unlink(this, { bidi: false });
    }

    return this;
  };

  isLinkedTo = (cell: Cell | undefined): boolean => (cell ? this.#links.has(cell) : false);
}

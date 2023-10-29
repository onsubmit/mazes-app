export default class Cell {
  #row: number;
  #column: number;
  #links: Set<Cell>;

  north?: Cell;
  south?: Cell;
  west?: Cell;
  east?: Cell;

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

  get links(): Cell[] {
    return [...this.#links.keys()];
  }

  get neighbors(): Cell[] {
    return [this.north, this.south, this.east, this.west].filter(Boolean);
  }

  link = (cell: Cell, options = { bidi: true }): this => {
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

  isLinkedTo = (cell: Cell): boolean => this.#links.has(cell);
}

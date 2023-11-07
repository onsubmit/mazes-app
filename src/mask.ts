import { sample } from './random';

export default class Mask {
  #rows: number;
  #columns: number;
  #bits: boolean[][];

  constructor(rows: number, columns: number) {
    this.#rows = rows;
    this.#columns = columns;
    this.#bits = Array.from(Array(rows), () => Array.from(Array(columns), () => true));
  }

  get rows(): number {
    return this.#rows;
  }

  get columns(): number {
    return this.#columns;
  }

  get count(): number {
    let count = 0;

    for (let row = 0; row < this.#rows; row++) {
      for (let column = 0; column < this.#columns; column++) {
        if (this.get(row, column)) {
          count += 1;
        }
      }
    }

    return count;
  }

  get = (row: number, column: number): boolean => {
    if (this.#bits[row]?.[column] === undefined) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return this.#bits[row]![column]!;
  };

  set = (row: number, column: number, isOn: boolean): void => {
    if (this.#bits[row]?.[column] === undefined) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    this.#bits[row]![column] = isOn;
  };

  getRandomOnLocation = (): { row: number; column: number } => {
    const availableIndices: Array<{ row: number; column: number }> = [];
    for (let row = 0; row < this.#rows; row++) {
      for (let column = 0; column < this.#columns; column++) {
        if (this.get(row, column)) {
          availableIndices.push({ row, column });
        }
      }
    }

    if (availableIndices.length === 0) {
      throw new Error('No on locations available');
    }

    return sample(availableIndices);
  };
}

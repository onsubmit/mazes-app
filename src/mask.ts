import { sample } from './random';

export default class Mask {
  private _rows: number;
  private _columns: number;
  private _bits: boolean[][];

  constructor(rows: number, columns: number) {
    this._rows = rows;
    this._columns = columns;
    this._bits = Array.from(Array(rows), () => Array.from(Array(columns), () => true));
  }

  static fromText = (value: string): Mask => {
    value = value.toLocaleUpperCase().trim();
    if (!value) {
      throw new Error('Empty text value');
    }

    const lines = value.split(/\r?\n|\r|\n/g);
    if (lines.some((l) => [...l].some((c) => c !== 'X' && c !== '.'))) {
      throw new Error('String must only contain Xs and periods');
    }

    const rows = lines.length;
    const columns = lines[0]?.length ?? 0;

    const mask = new Mask(rows, columns);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        mask.set(r, c, lines[r]?.[c] === 'X' ? false : true);
      }
    }

    return mask;
  };

  static fromImageAsync = (url: string): Promise<Mask> => {
    const image = new Image();

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('Image did not load within 5 seconds');
      }, 5000);

      image.onload = function () {
        clearTimeout(timeout);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Could not get rendering context');
        }

        const rows = image.height;
        const columns = image.width;

        context.drawImage(image, 0, 0, image.width, image.height);

        const mask = new Mask(rows, columns);
        const data = context.getImageData(0, 0, image.width, image.height).data;

        let i = 0;
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            const red = data[i++];
            const green = data[i++];
            const blue = data[i++];
            const alpha = data[i++];

            const isWhite = red === 255 && green === 255 && blue === 255 && alpha === 255;
            mask.set(row, column, isWhite);
          }
        }

        resolve(mask);
      };

      image.src = url;
    });
  };

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  get count(): number {
    let count = 0;

    for (let row = 0; row < this._rows; row++) {
      for (let column = 0; column < this._columns; column++) {
        if (this.get(row, column)) {
          count += 1;
        }
      }
    }

    return count;
  }

  get = (row: number, column: number): boolean => {
    if (this._bits[row]?.[column] === undefined) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    return this._bits[row]![column]!;
  };

  set = (row: number, column: number, isOn: boolean): void => {
    if (this._bits[row]?.[column] === undefined) {
      throw new Error(`Invalid index: (${row}, ${column})`);
    }

    this._bits[row]![column] = isOn;
  };

  getRandomOnLocation = (): { row: number; column: number } => {
    const availableIndices: Array<{ row: number; column: number }> = [];
    for (let row = 0; row < this._rows; row++) {
      for (let column = 0; column < this._columns; column++) {
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

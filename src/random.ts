export function randomInteger(max: number) {
  if (max < 0) {
    throw new Error('max must be nonnegative');
  }

  if (max === 0) {
    return 0;
  }

  return Math.floor(Math.random() * max);
}

export function randomBoolean() {
  return randomInteger(2) === 0;
}

export function sample<T>(set: Set<T>): T;
export function sample<T>(array: T[]): T;
export function sample<T>(setOrArray: T[] | Set<T>): T {
  const array = Array.isArray(setOrArray) ? setOrArray : [...setOrArray];

  if (array.length === 0) {
    throw new Error('Array is empty');
  }

  const index = randomInteger(array.length);
  return array[index]!;
}

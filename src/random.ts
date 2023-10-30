export function randomInteger(max: number) {
  if (max < 0) {
    throw new Error('max must be nonnegative');
  }

  if (max === 0) {
    return 0;
  }

  return Math.floor(Math.random() * max);
}

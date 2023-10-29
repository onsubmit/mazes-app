export function randomInteger(max: number) {
  if (max < 0) {
    throw new Error('max must be nonnegative');
  }

  return Math.floor(Math.random() * max);
}

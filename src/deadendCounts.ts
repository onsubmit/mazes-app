import AldousBroder from './algorithms/generation/aldousBroder';
import BinaryTree from './algorithms/generation/binaryTree';
import HuntAndKill from './algorithms/generation/huntAndKill';
import MazeGenerator from './algorithms/generation/mazeGenerator';
import RecursiveBacktracker from './algorithms/generation/recursiveBacktracker';
import Sidewinder from './algorithms/generation/sidewinder';
import Wilsons from './algorithms/generation/wilsons';
import CartesianGrid from './grids/cartesianGrid';

type GetDeadendCountsInput = {
  tries: number;
  size: number;
  onYield: (line: string) => void;
};

export function getDeadendCounts(input: GetDeadendCountsInput): void {
  loop(yieldDeadendCounts(input), input.onYield);
}

function loop(iterator: IterableIterator<string>, onYield: (line: string) => void) {
  setTimeout(() => {
    const next = iterator.next();
    if (!next.done) {
      onYield(next.value);
      loop(iterator, onYield);
    }
  });
}

function* yieldDeadendCounts({ tries, size }: GetDeadendCountsInput): IterableIterator<string> {
  const algorithms: Array<{ name: string; algorithm: MazeGenerator }> = [
    { name: 'BinaryTree', algorithm: new BinaryTree() },
    { name: 'Sidewinder', algorithm: new Sidewinder() },
    { name: 'AldousBroder', algorithm: new AldousBroder() },
    { name: 'Wilsons', algorithm: new Wilsons() },
    { name: 'HuntAndKill', algorithm: new HuntAndKill() },
    { name: 'RecursiveBacktracker', algorithm: new RecursiveBacktracker() },
  ];

  const totalCells = size * size;

  const averages: Map<string, number> = new Map();
  for (const { name, algorithm } of algorithms) {
    yield `Running ${name}...`;

    const deadendCounts: number[] = [];
    for (let t = 0; t < tries; t++) {
      const grid = CartesianGrid.create(size, size);
      algorithm.execute(grid);
      deadendCounts.push(grid.getDeadends().length);
    }

    const totalDeadends = deadendCounts.reduce((acc, curr) => acc + curr);
    averages.set(name, totalDeadends / deadendCounts.length);
  }

  yield '';
  yield `Average dead-ends per ${size}x${size} maze (${totalCells} cells):`;
  yield '';

  const sortedAlgorithms = algorithms
    .map(({ name }) => name)
    .sort((nameA, nameB) => {
      const averageA = averages.get(nameA) ?? 0;
      const averageB = averages.get(nameB) ?? 0;
      return averageA === averageB ? 0 : averageA > averageB ? -1 : 1;
    });

  for (const algorithm of sortedAlgorithms) {
    const average = averages.get(algorithm) ?? 0;
    const percentage = ((average * 100) / totalCells).toFixed(2);
    yield `${algorithm} : ${average}/${totalCells} (${percentage}%)`;
  }
}

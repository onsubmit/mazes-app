import BinaryTree from '../../algorithms/generation/binaryTree';
import Sidewinder from '../../algorithms/generation/sidewinder';
import DistanceGrid from '../../distanceGrid';

export default function Chapter03() {
  const binaryTreeGrid = new BinaryTree().execute(new DistanceGrid(10, 10));
  binaryTreeGrid.distances = binaryTreeGrid.getOrThrow(0, 0).distances;
  const sidewinderGrid = new Sidewinder().execute(new DistanceGrid(10, 10));
  sidewinderGrid.distances = sidewinderGrid.getOrThrow(0, 0).distances;

  return (
    <>
      <h1>Distance Grid: Binary Tree Demo</h1>
      <pre>{binaryTreeGrid.toString()}</pre>

      <h1>Sidewinder Demo</h1>
      <pre>{sidewinderGrid.toString()}</pre>
    </>
  );
}

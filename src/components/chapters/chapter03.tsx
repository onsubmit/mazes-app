import './chapterStyles.scss';

import BinaryTree from '../../algorithms/generation/binaryTree';
import Sidewinder from '../../algorithms/generation/sidewinder';
import DistanceGrid from '../../distanceGrid';

export default function Chapter03() {
  const binaryTreeGrid = new BinaryTree().execute(new DistanceGrid(10, 10));
  const binaryTreeGridStart = binaryTreeGrid.getOrThrow(0, 0);
  const binaryTreeGridEnd = binaryTreeGrid.getOrThrow(binaryTreeGrid.rows - 1, 0);

  binaryTreeGrid.setPathStart(binaryTreeGridStart);
  const binaryTreeGridUnsolved = binaryTreeGrid.toString();

  binaryTreeGrid.setPathEnd(binaryTreeGridEnd);
  const binaryTreeGridSolved = binaryTreeGrid.toString();

  const sidewinderGrid = new Sidewinder().execute(new DistanceGrid(10, 10));
  const sidewinderGridStart = sidewinderGrid.getOrThrow(0, 0);
  const sidewinderGridEnd = sidewinderGrid.getOrThrow(sidewinderGrid.rows - 1, 0);

  sidewinderGrid.setPathStart(sidewinderGridStart);
  const sidewinderGridUnsolved = sidewinderGrid.toString();

  sidewinderGrid.setPathEnd(sidewinderGridEnd);
  const sidewinderGridSolved = sidewinderGrid.toString();

  return (
    <>
      <h1>Distance Grids</h1>
      <h2>Binary Tree Demo</h2>
      <div className="row">
        <pre>{binaryTreeGridUnsolved}</pre>
        <pre>{binaryTreeGridSolved}</pre>
      </div>

      <h2>Sidewinder Demo</h2>
      <div className="row">
        <pre>{sidewinderGridUnsolved}</pre>
        <pre>{sidewinderGridSolved}</pre>
      </div>
    </>
  );
}

import './chapterStyles.scss';

import BinaryTree from '../../algorithms/generation/binaryTree';
import Sidewinder from '../../algorithms/generation/sidewinder';
import CartesianColoredGrid from '../../grids/cartesianColoredGrid';
import CartesianDistanceGrid from '../../grids/cartesianDistanceGrid';
import Canvas from '../canvas';

export default function Chapter03() {
  const binaryTreeGrid = new BinaryTree().execute(CartesianDistanceGrid.create(10, 10));
  const binaryTreeGridStart = binaryTreeGrid.getOrThrow(0, 0);
  const binaryTreeGridEnd = binaryTreeGridStart.getDistances().getFurthestCell().cell;

  binaryTreeGrid.setPathStart(binaryTreeGridStart);
  const binaryTreeGridUnsolved = binaryTreeGrid.toString();

  binaryTreeGrid.setPathEnd(binaryTreeGridEnd);
  const binaryTreeGridSolved = binaryTreeGrid.toString();

  const sidewinderGrid = new Sidewinder().execute(CartesianDistanceGrid.create(10, 10));
  const sidewinderGridStart = sidewinderGrid.getOrThrow(0, 0);
  const sidewinderGridEnd = sidewinderGridStart.getDistances().getFurthestCell().cell;

  sidewinderGrid.setPathStart(sidewinderGridStart);
  const sidewinderGridUnsolved = sidewinderGrid.toString();

  sidewinderGrid.setPathEnd(sidewinderGridEnd);
  const sidewinderGridSolved = sidewinderGrid.toString();

  const coloredBinaryTreeGrid = new BinaryTree().execute(CartesianColoredGrid.create(50, 50));
  const coloredBinaryTreeGridStart = coloredBinaryTreeGrid.getOrThrow(
    coloredBinaryTreeGrid.rows / 2,
    coloredBinaryTreeGrid.columns / 2
  );
  coloredBinaryTreeGrid.setPathStart(coloredBinaryTreeGridStart);

  const coloredSidewinderGrid = new Sidewinder().execute(CartesianColoredGrid.create(50, 50));
  const coloredSidewinderGridStart = coloredSidewinderGrid.getOrThrow(
    coloredSidewinderGrid.rows / 2,
    coloredSidewinderGrid.columns / 2
  );
  coloredSidewinderGrid.setPathStart(coloredSidewinderGridStart);

  return (
    <>
      <h1>Distance Grids</h1>
      <h2>Binary Tree Demo</h2>
      <div className="row">
        <pre>{binaryTreeGridUnsolved}</pre>
        <pre>{binaryTreeGridSolved}</pre>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${binaryTreeGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h2>Sidewinder Demo</h2>
      <div className="row">
        <pre>{sidewinderGridUnsolved}</pre>
        <pre>{sidewinderGridSolved}</pre>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${sidewinderGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h1>Colored Grids</h1>
      <h2>Binary Tree Demo</h2>
      <div className="row">
        <Canvas grid={coloredBinaryTreeGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${coloredBinaryTreeGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h2>Sidewinder Demo</h2>
      <div className="row">
        <Canvas grid={coloredSidewinderGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${coloredSidewinderGrid.getDeadends().length}`}</span>
        </div>
      </div>
    </>
  );
}

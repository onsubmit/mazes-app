import './chapterStyles.scss';

import BinaryTree from '../../algorithms/generation/binaryTree';
import Sidewinder from '../../algorithms/generation/sidewinder';
import CartesianGrid from '../../grids/cartesianGrid';
import Canvas from '../canvas';

export default function Chapter02() {
  const binaryTreeGrid = new BinaryTree().execute(new CartesianGrid(10, 10));
  const sidewinderGrid = new Sidewinder().execute(new CartesianGrid(10, 10));
  return (
    <>
      <h1>Binary Tree Demo</h1>
      <div className="row">
        <pre>{binaryTreeGrid.toString()}</pre>
        <Canvas grid={binaryTreeGrid}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${binaryTreeGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h1>Sidewinder Demo</h1>
      <div className="row">
        <pre>{sidewinderGrid.toString()}</pre>
        <Canvas grid={sidewinderGrid}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${sidewinderGrid.getDeadends().length}`}</span>
        </div>
      </div>
    </>
  );
}

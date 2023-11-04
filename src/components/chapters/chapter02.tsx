import BinaryTree from '../../algorithms/generation/binaryTree';
import Sidewinder from '../../algorithms/generation/sidewinder';
import Grid from '../../grid';
import Canvas from '../canvas';

function Chapter02() {
  const binaryTreeGrid = new BinaryTree().execute(new Grid(10, 10));
  const sidewinderGrid = new Sidewinder().execute(new Grid(10, 10));
  return (
    <>
      <h1>Binary Tree Demo</h1>
      <pre>{binaryTreeGrid.toString()}</pre>
      <Canvas grid={binaryTreeGrid}></Canvas>
      <h1>Sidewinder Demo</h1>
      <pre>{sidewinderGrid.toString()}</pre>
      <Canvas grid={sidewinderGrid}></Canvas>
    </>
  );
}

export default Chapter02;

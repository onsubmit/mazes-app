import BinaryTree from '../../algorithms/generation/binaryTree';
import Sidewinder from '../../algorithms/generation/sidewinder';
import Grid from '../../grid';

function Chapter01() {
  return (
    <>
      <h1>Binary Tree Demo</h1>
      <pre>{new BinaryTree().execute(new Grid(4, 4)).toString()}</pre>
      <h1>Sidewinder Demo</h1>
      <pre>{new Sidewinder().execute(new Grid(4, 4)).toString()}</pre>
    </>
  );
}

export default Chapter01;

import BinaryTree from '../../algorithms/generation/binaryTree';
import Grid from '../../grid';

function Chapter01() {
  const grid = new Grid(4, 4);
  BinaryTree.execute(grid);

  return (
    <>
      <h1>Binary Tree Demo</h1>
      <pre>{grid.toString()}</pre>
    </>
  );
}

export default Chapter01;

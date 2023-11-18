import './chapterStyles.scss';

import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import HexGrid from '../../grids/hexGrid';
import TriangleGrid from '../../grids/triangleGrid';
import Canvas from '../canvas';

export default function Chapter08() {
  const hexGrid = new RecursiveBacktracker().execute(HexGrid.create(10, 10));
  const triangleGrid = new RecursiveBacktracker().execute(TriangleGrid.create(10, 17));
  return (
    <>
      <h1>Hex Grid Demo</h1>
      <div className="row">
        <Canvas grid={hexGrid} cellSize={32}></Canvas>
      </div>
      <h1>Triangle Grid Demo</h1>
      <div className="row">
        <Canvas grid={triangleGrid} cellSize={32}></Canvas>
      </div>
    </>
  );
}

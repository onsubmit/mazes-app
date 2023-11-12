import './chapterStyles.scss';

import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import HexGrid from '../../grids/hexGrid';
import Canvas from '../canvas';

export default function Chapter08() {
  const hexGrid = new RecursiveBacktracker().execute(HexGrid.create(10, 10));
  return (
    <>
      <h1>Hex Grid Demo</h1>
      <div className="row">
        <Canvas grid={hexGrid} cellSize={32}></Canvas>
      </div>
    </>
  );
}

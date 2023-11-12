import './chapterStyles.scss';

import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import PolarColoredGrid from '../../grids/polarColoredGrid';
import Canvas from '../canvas';

export default function Chapter07() {
  const polarGrid = new RecursiveBacktracker().execute(PolarColoredGrid.create(16));
  const polarGridStart = polarGrid.getOrThrow(0, 0);
  polarGrid.setPathStart(polarGridStart);
  return (
    <>
      <h1>Polar Grid Demo</h1>
      <div className="row">
        <Canvas grid={polarGrid} cellSize={32}></Canvas>
      </div>
    </>
  );
}

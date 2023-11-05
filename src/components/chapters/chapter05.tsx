import './chapterStyles.scss';

import HuntAndKill from '../../algorithms/generation/huntAndKill';
import ColoredGrid from '../../coloredGrid';
import Canvas from '../canvas';

export default function Chapter05() {
  const huntAndKillGrid = new HuntAndKill().execute(new ColoredGrid(30, 30));
  const huntAndKillGridStart = huntAndKillGrid.getOrThrow(
    huntAndKillGrid.rows / 2,
    huntAndKillGrid.columns / 2
  );
  huntAndKillGrid.setPathStart(huntAndKillGridStart);

  return (
    <>
      <h1>Colored Grids</h1>
      <h2>Hunt-and-Kill Demo</h2>
      <div className="row">
        <Canvas grid={huntAndKillGrid} cellSize={16}></Canvas>
      </div>
    </>
  );
}

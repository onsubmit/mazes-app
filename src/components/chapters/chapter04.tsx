import './chapterStyles.scss';

import AldousBroder from '../../algorithms/generation/aldousBroder';
import Wilsons from '../../algorithms/generation/wilsons';
import ColoredGrid from '../../coloredGrid';
import Canvas from '../canvas';

export default function Chapter04() {
  const aldousBroderGrid = new AldousBroder().execute(new ColoredGrid(30, 30));
  const aldousBroderGridStart = aldousBroderGrid.getOrThrow(
    aldousBroderGrid.rows / 2,
    aldousBroderGrid.columns / 2
  );
  aldousBroderGrid.setPathStart(aldousBroderGridStart);

  const wilsonsGrid = new Wilsons().execute(new ColoredGrid(30, 30));
  const wilsonsGridStart = wilsonsGrid.getOrThrow(wilsonsGrid.rows / 2, wilsonsGrid.columns / 2);
  wilsonsGrid.setPathStart(wilsonsGridStart);

  return (
    <>
      <h1>Colored Grids</h1>
      <h2>Aldous-Broder Demo</h2>
      <div className="row">
        <Canvas grid={aldousBroderGrid} cellSize={16}></Canvas>
      </div>

      <h2>Wilson's Demo</h2>
      <div className="row">
        <Canvas grid={wilsonsGrid} cellSize={16}></Canvas>
      </div>
    </>
  );
}

import './chapterStyles.scss';

import AldousBroder from '../../algorithms/generation/aldousBroder';
import Wilsons from '../../algorithms/generation/wilsons';
import CartesianColoredGrid from '../../grids/cartesianColoredGrid';
import Canvas from '../canvas';

export default function Chapter04() {
  const aldousBroderGrid = new AldousBroder().execute(CartesianColoredGrid.create(30, 30));
  const aldousBroderGridStart = aldousBroderGrid.getOrThrow(
    aldousBroderGrid.rows / 2,
    aldousBroderGrid.columns / 2
  );
  aldousBroderGrid.setPathStart(aldousBroderGridStart);

  const wilsonsGrid = new Wilsons().execute(CartesianColoredGrid.create(30, 30));
  const wilsonsGridStart = wilsonsGrid.getOrThrow(wilsonsGrid.rows / 2, wilsonsGrid.columns / 2);
  wilsonsGrid.setPathStart(wilsonsGridStart);

  return (
    <>
      <h1>Aldous-Broder Demo</h1>
      <div className="row">
        <Canvas grid={aldousBroderGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${aldousBroderGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h1>Wilson's Demo</h1>
      <div className="row">
        <Canvas grid={wilsonsGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${wilsonsGrid.getDeadends().length}`}</span>
        </div>
      </div>
    </>
  );
}

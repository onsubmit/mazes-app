import './chapterStyles.scss';

import AldousBroder from '../../algorithms/generation/aldousBroder';
import ColoredGrid from '../../coloredGrid';
import Canvas from '../canvas';

export default function Chapter04() {
  const coloredAldousBroderGrid = new AldousBroder().execute(new ColoredGrid(50, 50));
  const coloredAldousBroderGridStart = coloredAldousBroderGrid.getOrThrow(
    coloredAldousBroderGrid.rows / 2,
    coloredAldousBroderGrid.columns / 2
  );
  coloredAldousBroderGrid.setPathStart(coloredAldousBroderGridStart);

  return (
    <>
      <h1>Colored Grids</h1>
      <h2>AldousBroder Demo</h2>
      <div className="row">
        <Canvas grid={coloredAldousBroderGrid} cellSize={16}></Canvas>
      </div>
    </>
  );
}

import PolarGrid from '../../grids/polarGrid';
import Canvas from '../canvas';

export default function Chapter07() {
  const polarGrid = new PolarGrid(8, 8);
  return (
    <>
      <h1>Polar Grid Demo</h1>
      <div className="row">
        <Canvas grid={polarGrid}></Canvas>
      </div>
    </>
  );
}

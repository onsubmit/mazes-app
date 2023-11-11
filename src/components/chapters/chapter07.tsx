import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import PolarGrid from '../../grids/polarGrid';
import Canvas from '../canvas';

export default function Chapter07() {
  const polarGrid = PolarGrid.create(16);
  new RecursiveBacktracker().execute(polarGrid);
  return (
    <>
      <h1>Polar Grid Demo</h1>
      <div className="row">
        <Canvas grid={polarGrid} cellSize={16}></Canvas>
      </div>
    </>
  );
}

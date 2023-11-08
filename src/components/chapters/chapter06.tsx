import './chapterStyles.scss';

import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import MaskedGrid from '../../grids/maskedGrid';
import Mask from '../../mask';

export default function Chapter06() {
  const mask = new Mask(5, 5);
  mask.set(0, 0, false);
  mask.set(2, 2, false);
  mask.set(4, 4, false);

  const maskedGrid = new MaskedGrid(mask);
  new RecursiveBacktracker().execute(maskedGrid);

  return (
    <>
      <h1>Simple Mask Demo</h1>
      <div className="row">
        <pre>{maskedGrid.toString()}</pre>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${maskedGrid.getDeadends().length}`}</span>
        </div>
      </div>
    </>
  );
}

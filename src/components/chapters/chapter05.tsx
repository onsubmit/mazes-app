import './chapterStyles.scss';

import { Button } from '@mui/material';
import { useRef } from 'react';

import HuntAndKill from '../../algorithms/generation/huntAndKill';
import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import { getDeadendCounts } from '../../deadendCounts';
import CartesianColoredGrid from '../../grids/cartesianColoredGrid';
import Canvas from '../canvas';

export default function Chapter05() {
  const preRef = useRef<HTMLPreElement>(null);

  const huntAndKillGrid = new HuntAndKill().execute(CartesianColoredGrid.create(30, 30));
  const huntAndKillGridStart = huntAndKillGrid.getOrThrow(
    huntAndKillGrid.rows / 2,
    huntAndKillGrid.columns / 2
  );
  huntAndKillGrid.setPathStart(huntAndKillGridStart);

  const recursiveBacktrackerGrid = new RecursiveBacktracker().execute(
    CartesianColoredGrid.create(30, 30)
  );
  const recursiveBacktrackerGridStart = recursiveBacktrackerGrid.getOrThrow(
    recursiveBacktrackerGrid.rows / 2,
    recursiveBacktrackerGrid.columns / 2
  );
  recursiveBacktrackerGrid.setPathStart(recursiveBacktrackerGridStart);

  const reportStatus = () => {
    const pre = preRef.current;
    if (!pre) return;

    pre.innerText = '';
    getDeadendCounts({
      tries: 100,
      size: 30,
      onYield: (line) => (pre.innerText += `${line}\n`),
    });
  };

  return (
    <>
      <h1>Hunt-and-Kill Demo</h1>
      <div className="row">
        <Canvas grid={huntAndKillGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${huntAndKillGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h1>Recursive Backtracker Demo</h1>
      <div className="row">
        <Canvas grid={recursiveBacktrackerGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${recursiveBacktrackerGrid.getDeadends().length}`}</span>
        </div>
      </div>

      <h1>Dead-end counts</h1>
      <div className="row">
        <div>
          <Button onClick={reportStatus} variant="contained">
            Generate stats
          </Button>
          <pre ref={preRef}></pre>
        </div>
      </div>
    </>
  );
}

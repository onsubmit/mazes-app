import './chapterStyles.scss';

import { Button } from '@mui/material';
import { useRef } from 'react';

import HuntAndKill from '../../algorithms/generation/huntAndKill';
import ColoredGrid from '../../coloredGrid';
import { getDeadendCounts } from '../../deadendCounts';
import Canvas from '../canvas';

export default function Chapter05() {
  const preRef = useRef<HTMLPreElement>(null);

  const huntAndKillGrid = new HuntAndKill().execute(new ColoredGrid(30, 30));
  const huntAndKillGridStart = huntAndKillGrid.getOrThrow(
    huntAndKillGrid.rows / 2,
    huntAndKillGrid.columns / 2
  );
  huntAndKillGrid.setPathStart(huntAndKillGridStart);

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
      <h1>Colored Grids</h1>
      <h2>Hunt-and-Kill Demo</h2>
      <div className="row">
        <Canvas grid={huntAndKillGrid} cellSize={16}></Canvas>
        <div>
          <h3>Stats</h3>
          <span>{`Num deadends: ${huntAndKillGrid.getDeadends().length}`}</span>
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

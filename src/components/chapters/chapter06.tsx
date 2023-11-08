import './chapterStyles.scss';

import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import MaskedGrid from '../../grids/maskedGrid';
import Mask from '../../mask';
import Canvas from '../canvas';

const MASK_TEXT_EXAMPLE = `
X........X
....XX....
...XXXX...
....XX....
X........X
X........X
....XX....
...XXXX...
....XX....
X........X
`.trim();

export default function Chapter06() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [maskedGridFromText, setMaskedGridFromText] = useState<MaskedGrid | undefined>();

  const mask = new Mask(5, 5);
  mask.set(0, 0, false);
  mask.set(2, 2, false);
  mask.set(4, 4, false);

  const maskedGrid = new MaskedGrid(mask);
  new RecursiveBacktracker().execute(maskedGrid);

  const generateMask = () => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const mask = Mask.fromText(textArea.value);
    const maskedGrid = new MaskedGrid(mask);
    new RecursiveBacktracker().execute(maskedGrid);
    setMaskedGridFromText(maskedGrid);
  };

  useEffect(generateMask, []);

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

      <h1>Text Mask Demo</h1>
      <div className="row">
        <div>
          <div>
            <textarea ref={textAreaRef} defaultValue={MASK_TEXT_EXAMPLE}></textarea>
          </div>
          <Button onClick={generateMask} variant="contained">
            Generate mask
          </Button>
        </div>
        {maskedGridFromText && (
          <>
            <Canvas grid={maskedGridFromText} cellSize={32}></Canvas>
            <div>
              <h3>Stats</h3>
              <span>{`Num deadends: ${maskedGridFromText.getDeadends().length}`}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

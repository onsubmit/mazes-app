import './chapterStyles.scss';

import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import RecursiveBacktracker from '../../algorithms/generation/recursiveBacktracker';
import ImageMaskPng from '../../assets/image-mask.png';
import MaskedGrid from '../../grids/maskedGrid';
import Mask from '../../mask';
import Canvas from '../canvas';

const TEXT_MASK_EXAMPLE = `
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
  const [textMaskValue, setTextMaskValue] = useState<string>(TEXT_MASK_EXAMPLE);
  const [maskedGridFromText, setMaskedGridFromText] = useState<MaskedGrid | undefined>();
  const [maskedGridFromImage, setMaskedGridFromImage] = useState<MaskedGrid | undefined>();

  const mask = new Mask(5, 5);
  mask.set(0, 0, false);
  mask.set(2, 2, false);
  mask.set(4, 4, false);

  const maskedGrid = new MaskedGrid(mask);
  new RecursiveBacktracker().execute(maskedGrid);

  const generateTextMask = () => {
    const mask = Mask.fromText(textMaskValue);
    const maskedGrid = new MaskedGrid(mask);
    new RecursiveBacktracker().execute(maskedGrid);
    setMaskedGridFromText(maskedGrid);
  };

  const generateImageMask = async () => {
    const mask = await Mask.fromImageAsync(ImageMaskPng);
    const maskedGrid = new MaskedGrid(mask);
    new RecursiveBacktracker().execute(maskedGrid);
    setMaskedGridFromImage(maskedGrid);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps -- Only generate once on component render
  useEffect(generateTextMask, []);
  useEffect(() => {
    generateImageMask();
  }, []);

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
            <textarea
              onChange={(e) => setTextMaskValue(e.currentTarget.value)}
              defaultValue={TEXT_MASK_EXAMPLE}
            ></textarea>
          </div>
          <Button onClick={generateTextMask} variant="contained">
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

      <h1>Image Mask Demo</h1>
      <div className="row">
        <div>
          <div>
            <Box
              component="img"
              sx={{
                width: 84,
                height: 50,
              }}
              alt="The house from the offer."
              src={ImageMaskPng}
            />
          </div>
        </div>
        {maskedGridFromImage && (
          <>
            <Canvas grid={maskedGridFromImage} cellSize={4}></Canvas>
            <div>
              <h3>Stats</h3>
              <span>{`Num deadends: ${maskedGridFromImage.getDeadends().length}`}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

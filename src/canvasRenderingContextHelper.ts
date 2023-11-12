import { twoPi } from './math';

export default class CanvasRenderingContextHelper {
  private _context: CanvasRenderingContext2D;

  readonly fontSize = 12;

  constructor(canvas: HTMLCanvasElement, backgroundColor: string, strokeStyle: string) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get rendering context');
    }

    this._context = context;
    this._context.fillStyle = backgroundColor;
    this._context.strokeStyle = strokeStyle;
    this._context.font = `${this.fontSize}px Arial`;
    this._context.fillRect(0, 0, canvas.width, canvas.height);
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    this._context.beginPath();
    this._context.moveTo(x1, y1);
    this._context.lineTo(x2, y2);
    this._context.stroke();
  };

  drawRectangle = (x1: number, y1: number, x2: number, y2: number, color: string) => {
    const originalFillStyle = this._context.fillStyle;
    this._context.fillStyle = color;
    this._context.fillRect(x1, y1, x2, y2);
    this._context.fillStyle = originalFillStyle;
  };

  drawArc = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
    this._context.beginPath();
    this._context.moveTo(x2, y2);
    this._context.arcTo(x1, y1, x2, y2, radius);
    this._context.stroke();
  };

  drawCircle = (x: number, y: number, radius: number) => {
    this._context.moveTo(x + radius, 0);
    this._context.arc(x, y, radius, 0, twoPi);
    this._context.stroke();
  };

  fillText = (x: number, y: number, text: string, color: string) => {
    const originalFillStyle = this._context.fillStyle;
    this._context.fillStyle = color;
    this._context.fillText(text, x, y);
    this._context.fillStyle = originalFillStyle;
  };

  fillCircle = (x: number, y: number, radius: number, color: string) => {
    const originalFillStyle = this._context.fillStyle;
    this._context.fillStyle = color;
    this._context.beginPath();
    this._context.arc(x, y, radius, 0, twoPi);
    this._context.closePath();
    this._context.fill();
    this._context.fillStyle = originalFillStyle;
  };

  fillPath = (getSegments: (context: CanvasRenderingContext2D) => void, color: string) => {
    const originalFillStyle = this._context.fillStyle;
    const originalStrokeStyle = this._context.strokeStyle;
    this._context.beginPath();
    getSegments(this._context);

    this._context.fillStyle = color;
    this._context.strokeStyle = color;
    this._context.fill();
    this._context.stroke();
    this._context.fillStyle = originalFillStyle;
    this._context.strokeStyle = originalStrokeStyle;
  };
}

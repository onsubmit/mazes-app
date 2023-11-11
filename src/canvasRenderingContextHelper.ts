import { twoPi } from './math';

export default class CanvasRenderingContextHelper {
  #context: CanvasRenderingContext2D;

  readonly fontSize = 12;

  constructor(canvas: HTMLCanvasElement, backgroundColor: string, strokeStyle: string) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get rendering context');
    }

    this.#context = context;
    this.#context.fillStyle = backgroundColor;
    this.#context.strokeStyle = strokeStyle;
    this.#context.font = `${this.fontSize}px Arial`;
    this.#context.fillRect(0, 0, canvas.width, canvas.height);
  }

  get context(): CanvasRenderingContext2D {
    return this.#context;
  }

  drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    this.#context.beginPath();
    this.#context.moveTo(x1, y1);
    this.#context.lineTo(x2, y2);
    this.#context.stroke();
  };

  drawRectangle = (x1: number, y1: number, x2: number, y2: number, color: string) => {
    const originalFillStyle = this.#context.fillStyle;
    this.#context.fillStyle = color;
    this.#context.fillRect(x1, y1, x2, y2);
    this.#context.fillStyle = originalFillStyle;
  };

  drawArc = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
    this.#context.beginPath();
    this.#context.moveTo(x2, y2);
    this.#context.arcTo(x1, y1, x2, y2, radius);
    this.#context.stroke();
  };

  drawCircle = (x: number, y: number, radius: number) => {
    this.#context.moveTo(x + radius, 0);
    this.#context.arc(x, y, radius, 0, twoPi);
    this.#context.stroke();
  };

  fillText = (x: number, y: number, text: string, color: string) => {
    const originalFillStyle = this.#context.fillStyle;
    this.#context.fillStyle = color;
    this.#context.fillText(text, x, y);
    this.#context.fillStyle = originalFillStyle;
  };

  fillCircle = (x: number, y: number, radius: number, color: string) => {
    const originalFillStyle = this.#context.fillStyle;
    this.#context.fillStyle = color;
    this.#context.beginPath();
    this.#context.arc(x, y, radius, 0, twoPi);
    this.#context.closePath();
    this.#context.fill();
    this.#context.fillStyle = originalFillStyle;
  };

  fillPath = (getSegments: (context: CanvasRenderingContext2D) => void, color: string) => {
    const originalFillStyle = this.#context.fillStyle;
    const originalStrokeStyle = this.#context.strokeStyle;
    this.#context.beginPath();
    getSegments(this.#context);

    this.#context.fillStyle = color;
    this.#context.strokeStyle = color;
    this.#context.fill();
    this.#context.stroke();
    this.#context.fillStyle = originalFillStyle;
    this.#context.strokeStyle = originalStrokeStyle;
  };
}

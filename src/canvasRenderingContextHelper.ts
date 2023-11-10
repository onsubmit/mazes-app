import { twoPi } from './math';

export default class CanvasRenderingContextHelper {
  #context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, backgroundColor: string, strokeStyle: string) {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get rendering context');
    }

    this.#context = context;
    this.#context.fillStyle = backgroundColor;
    this.#context.strokeStyle = strokeStyle;
    this.#context.fillRect(0, 0, canvas.width, canvas.height);
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

  drawCircle = (x: number, y: number, radius: number) => {
    this.#context.arc(x, y, radius, 0, twoPi, false);
  };
}

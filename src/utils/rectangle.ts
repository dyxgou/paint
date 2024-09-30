import Tool, { type ToolType } from "./tool";

class Rectangle extends Tool implements ToolType {
  #startX?: number;
  #startY?: number;
  #image?: ImageData;
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  setColor(color: string): void {
    this.ctx.strokeStyle = color;
  }

  onMouseDown({ offsetX, offsetY }: MouseEvent): void {
    this.isDrawing = true;
    this.#startX = offsetX;
    this.#startY = offsetY;

    const { width, height } = this.ctx.canvas;
    this.#image = this.ctx.getImageData(0, 0, width, height);
  }

  onMouseMove({ offsetX, offsetY }: MouseEvent): void {
    if (!this.isDrawing || !this.#image) return;
    if (!this.#startX || !this.#startY) return;

    this.ctx.putImageData(this.#image, 0, 0);

    const width = offsetX - this.#startX;
    const height = offsetY - this.#startY;

    this.ctx.beginPath();
    this.ctx.strokeRect(this.#startX, this.#startY, width, height);
  }

  onMouseUp(): void {
    this.isDrawing = false;
    this.ctx.closePath();
  }
}

export default Rectangle;

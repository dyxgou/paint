import Tool, { type ToolType } from "./tool";
import { DEFAULT_LINE_WIDTH } from "./canvas";

class Drawer extends Tool implements ToolType {
  #startX?: number;
  #startY?: number;
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
    this.ctx.lineWidth = DEFAULT_LINE_WIDTH;
  }

  onMouseMove({ offsetX, offsetY }: MouseEvent): void {
    if (!this.isDrawing) return;
    if (!this.#startX || !this.#startY) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.#startX, this.#startY);

    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();

    this.#startX = offsetX;
    this.#startY = offsetY;
  }

  onMouseUp(): void {
    this.isDrawing = false;
    this.ctx.closePath();
  }
}

export default Drawer;

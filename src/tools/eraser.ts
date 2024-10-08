import { DEFAULT_LINE_WIDTH } from "./canvas";
import Tool, { type ToolType } from "./tool";

class Drawer extends Tool implements ToolType {
  #startX?: number;
  #startY?: number;
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  onMouseDown({ offsetX, offsetY }: MouseEvent): void {
    this.isDrawing = true;
    this.#startX = offsetX;
    this.#startY = offsetY;
    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.lineWidth = 20;
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
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.lineWidth = DEFAULT_LINE_WIDTH;
  }
}

export default Drawer;

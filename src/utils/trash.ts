import Tool, { type ToolType } from "./tool";

class Trash extends Tool implements ToolType {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  onMouseDown(): void {
    const canvas = this.ctx.canvas;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  onMouseMove(): void {}
  onMouseUp(): void {}
}

export default Trash;

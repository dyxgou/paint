import ImageManager from "@/utils/imageManager";
import Tool, { type ToolType } from "./tool";
import { hexToRgb } from "@/utils/transformColor";

class Fill extends Tool implements ToolType {
  #color?: string;
  #imageManager: ImageManager;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
    this.#imageManager = new ImageManager();
  }

  setColor(color: string) {
    this.#color = color;
  }

  onMouseDown({ offsetX, offsetY }: MouseEvent): void {
    if (!this.#color) return;

    const { clientWidth, clientHeight } = this.ctx.canvas;
    this.#imageManager.setImageData(
      this.ctx.getImageData(0, 0, clientWidth, clientHeight),
    );

    const newColor = hexToRgb(this.#color);
    this.#imageManager.floodfill(offsetX, offsetY, newColor);

    this.#imageManager.putImageData(this.ctx);
  }

  onMouseUp(event?: MouseEvent): void {}
  onMouseMove(event?: MouseEvent): void {}
}

export default Fill;

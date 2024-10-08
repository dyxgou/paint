import { PIXEL_DISTANCE, rgbToHex } from "@/utils/transformColor";
import Tool, { type ToolType } from "./tool";
import { setColor } from "@/store/color";
import { setTool } from "@/store/tools";

class Picker extends Tool implements ToolType {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  onMouseDown({ offsetX, offsetY }: MouseEvent): void {
    const imageSection = this.ctx.getImageData(
      offsetX,
      offsetY,
      PIXEL_DISTANCE,
      PIXEL_DISTANCE,
    );

    const [red, green, blue] = imageSection.data;

    const color = rgbToHex(red, green, blue);
    setColor(color);
    setTool("draw");
  }

  onMouseMove(event?: MouseEvent): void {}
  onMouseUp(event?: MouseEvent): void {}
}

export default Picker;

import Tool, { type ToolType } from "./tool";
import { type Pixel } from "@/utils/getImagePixel";
import { hexToRgb } from "@/utils/transformColor";
import Queue from "@/utils/queue";

class Fill extends Tool implements ToolType {
  #imageData?: ImageData;
  #color?: string;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  #areColorsEquals(colorOne: Pixel, colorTwo: Pixel) {
    if (colorOne.length !== colorTwo.length) {
      return false;
    }

    for (let i = 0; i < colorOne.length; i++) {
      if (colorOne[i] !== colorTwo[i]) {
        return false;
      }
    }

    return true;
  }

  setColor(color: string) {
    this.#color = color;
  }

  #getPixelIndex(x: number, y: number) {
    if (!this.#imageData) {
      this.#imageData = this.ctx.getImageData(
        0,
        0,
        this.ctx.canvas.clientWidth,
        this.ctx.canvas.clientHeight,
      );
    }

    const index = (y * this.#imageData.width + x) * 4;
    return index;
  }

  #getImageColor(x: number, y: number): Pixel {
    const index = this.#getPixelIndex(x, y);

    const color = this.#imageData?.data.slice(0, 3)!;

    return color;
  }

  #createPosition(x: number, y: number): Uint16Array {
    const position = new Uint16Array(2);

    position[0] = x;
    position[1] = y;

    return position;
  }

  #floodfill(i: number, j: number, newColor: Pixel) {
    if (!this.#imageData) return;

    const { width, height } = this.#imageData;

    const oldColor = this.#getImageColor(i, j);

    if (this.#areColorsEquals(oldColor, newColor)) {
      return;
    }

    const queue = new Queue<Uint16Array>();
    queue.put(this.#createPosition(i, j));

    console.log(queue);

    while (!queue.isEmpty()) {
      const [x, y] = queue.get()!;

      if (
        x < 0 ||
        x >= width ||
        y < 0 ||
        y >= height ||
        this.#getImageColor(x, y) !== oldColor
      ) {
        continue;
      } else {
        const index = this.#getPixelIndex(x, y);
        this.#imageData.data[index] = newColor[0];
        this.#imageData.data[index + 1] = newColor[1];
        this.#imageData.data[index + 2] = newColor[2];
        queue.put(this.#createPosition(x + 1, y));
        queue.put(this.#createPosition(x - 1, y));
        queue.put(this.#createPosition(x, y + 1));
        queue.put(this.#createPosition(x, y - 1));
      }
    }
  }

  onMouseDown1({ offsetX, offsetY }: MouseEvent): void {
    const canvas = this.ctx.canvas;
    const { width, height } = canvas;

    const image = this.ctx.getImageData(0, 0, width, height);
    this.#imageData = image;

    if (!this.#color) {
      return;
    }

    const newColor = hexToRgb(this.#color);
    this.#floodfill(offsetX, offsetY, newColor);

    this.ctx.putImageData(this.#imageData, 0, 0);
  }

  onMouseDown(event?: MouseEvent): void {
    const queue = new Queue<number>();
    queue.put(1);
    queue.put(2);
    queue.put(3);
    queue.put(4);

    console.log(queue.get());
    console.log(queue.get());
    console.log(queue.get());
    console.log(queue.get());
  }
  onMouseMove(event?: MouseEvent): void {}
  onMouseUp(event?: MouseEvent): void {}
}

export default Fill;

import { $color } from "@/store/color";
import Tool, { type ToolType } from "./tool";

type Position = [number, number];

class Fill extends Tool implements ToolType {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  #getCors(event: MouseEvent) {
    const canvas = this.ctx.canvas;
    const bounding = canvas.getBoundingClientRect();

    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;

    return [x, y];
  }

  #getPixelColor(x: number, y: number) {
    const PIXEL_DISTANCE = 1;

    const pixel = this.ctx.getImageData(x, y, PIXEL_DISTANCE, PIXEL_DISTANCE);
    const [red, green, blue] = pixel.data;

    const getHex = (color: number) => color.toString(16).padStart(2, "0");

    const hexRed = getHex(red);
    const hexGreen = getHex(green);
    const hexBlue = getHex(blue);

    return `#${hexRed}${hexGreen}${hexBlue}`;
  }

  #getPosition(x: number, y: number): Position {
    const pos = new Array<number>(2) as Position;
    pos[0] = x;
    pos[1] = y;

    return pos;
  }

  #floodfill(event: MouseEvent, x: number, y: number) {
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    console.log({ width, height });

    const [xCor, yCor] = this.#getCors(event);
    const oldColor = this.#getPixelColor(xCor, yCor);
    const newColor = $color.get();

    if (oldColor === newColor) {
      return;
    }

    const queue: Array<[number, number]> = [];
    const newImageData = this.ctx.getImageData(0, 0, width, height).data;

    queue.push(this.#getPosition(x, y));

    while (queue.length !== 0) {
      const [i, j] = queue.pop()!;

      if (
        i < 0 ||
        i > width ||
        j < 0 ||
        j > height ||
        this.#getPixelColor(i, j) != oldColor
      ) {
        continue;
      } else {
        console.log({ newImageData });
      }
    }
  }

  onMouseDown(event: MouseEvent): void {
    const [xCor, yCor] = this.#getCors(event);
    const oldColor = this.#getPixelColor(xCor, yCor);
    const newColor = $color.get();

    this.#floodfill(event, xCor, yCor);
  }

  onMouseMove(event?: MouseEvent): void {}

  onMouseUp(event?: MouseEvent): void {}
}

export default Fill;

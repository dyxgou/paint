import Queue from "./queue";

const PIXEL_LENGTH = 4;

export type Pixel = [number, number, number, number];

class ImageManager {
  #imageData?: ImageData;

  floodfill(x: number, y: number, newColor: Pixel) {
    const oldColor = this.getPixelColor(x, y);

    if (this.colorsMatch(newColor, oldColor)) return;

    const queue = new Queue<[number, number]>();
    queue.put(this.createPosition(x, y));

    const { width, height } = this.#imageData!;

    while (!queue.isEmpty()) {
      const [i, j] = queue.get()!;
      const currentColor = this.getPixelColor(i, j);

      if (
        i < 0 ||
        i >= width ||
        j < 0 ||
        j >= height ||
        !this.colorsMatch(currentColor, oldColor)
      ) {
        continue;
      }

      this.setPixelColor(i, j, newColor);
      queue.put(this.createPosition(i + 1, j)); // Right
      queue.put(this.createPosition(i - 1, j)); // Left
      queue.put(this.createPosition(i, j + 1)); // Up
      queue.put(this.createPosition(i, j - 1)); // Down
    }
  }

  setImageData(imageData: ImageData) {
    this.#imageData = imageData;
  }

  getIndex(x: number, y: number): number {
    if (!this.#imageData) {
      throw new Error("No image data");
    }

    const width = this.#imageData.width;

    return (y * width + x) * PIXEL_LENGTH;
  }

  getPixelColor(x: number, y: number): Pixel {
    const index = this.getIndex(x, y);

    const color = new Array<number>(PIXEL_LENGTH) as Pixel;
    const data = this.#imageData!.data;

    color[0] = data[index];
    color[1] = data[index + 1];
    color[2] = data[index + 2];
    color[3] = data[index + 3];

    return color;
  }

  setPixelColor(x: number, y: number, color: Pixel): void {
    const index = this.getIndex(x, y);

    const data = this.#imageData!.data;

    data[index] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = color[3];
  }

  colorsMatch(colorOne: Pixel, colorTwo: Pixel): boolean {
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

  createPosition(x: number, y: number): [number, number] {
    // const CANVAS_DIMENTION = 2;
    // const position = new Uint16Array(CANVAS_DIMENTION);
    //
    // position[0] = x;
    // position[1] = y;

    return [x, y];
  }

  putImageData(ctx: CanvasRenderingContext2D) {
    if (!this.#imageData) return;

    ctx.putImageData(this.#imageData, 0, 0);
  }
}

export default ImageManager;

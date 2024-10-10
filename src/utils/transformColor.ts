import type { Pixel } from "./imageManager";

export const PIXEL_DISTANCE = 1;

export const rgbToHex = (red: number, green: number, blue: number): string => {
  const hexR = red.toString(16).padStart(2, "0");
  const hexG = green.toString(16).padStart(2, "0");
  const hexB = blue.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
};

export const hexToRgb = (color: string): Pixel => {
  let hex = color.replace("#", "");

  if (hex.length === 3) {
    let newHex: string = "";
    for (let i = 0; i < hex.length; i++) {
      const value = hex[i];

      newHex += value + value;
    }

    hex = newHex;
  }

  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  const ALPHA = 255;

  const pixel = new Uint8ClampedArray(4);
  pixel[0] = red;
  pixel[1] = green;
  pixel[2] = blue;
  pixel[3] = ALPHA;

  return pixel;
};

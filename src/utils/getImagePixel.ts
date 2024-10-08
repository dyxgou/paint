export type Pixel = Uint8ClampedArray;

const getImagePixel = (index: number, imageArray: Uint8ClampedArray): Pixel => {
  const pixel = new Uint8ClampedArray();

  pixel[0] = imageArray[index];
  pixel[1] = imageArray[index];
  pixel[2] = imageArray[index];

  return pixel;
};

export default getImagePixel;

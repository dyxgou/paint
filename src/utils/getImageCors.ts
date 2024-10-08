const getImageCors = (x: number, y: number, imageData: ImageData): number => {
  const index = (y * imageData.width + x) * 4;

  return index;
};

export default getImageCors;

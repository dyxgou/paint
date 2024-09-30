import { setColor } from "@/store/color";
import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useState } from "preact/hooks";

export const COLORS: string[] = [
  // "black",
  "#000",
  // "white",
  "#ffffff",
  // blue
  "#2653d1",
  // "green",
  "#2cdb32",
  // "red",
  "#d90909",
  // "yellow",
  "#ffc800",
  // "violet",
  "#5d00ff",
  // "gray",
  "#474747",
  // "orange",
  "#fa5300",
  // "cyan",
  "#00f7ff",
];

const useInputColor = () => {
  const [colors, setColors] = useState(COLORS);

  const handleAddColor = (
    e: JSXInternal.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const color = e.currentTarget.value;
    setColor(color);

    const newColors: string[] = [color];

    for (let i = 0; i < colors.length - 1; i++) {
      const colorCopy = colors[i];

      newColors.push(colorCopy);
    }

    setColors(newColors);
  };

  return { colors, handleAddColor };
};

export default useInputColor;

import { COLORS, setColor } from "@/store/color";
import type { JSXInternal } from "node_modules/preact/src/jsx";
import { useState } from "preact/hooks";

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

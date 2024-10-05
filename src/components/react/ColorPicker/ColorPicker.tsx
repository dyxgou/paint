import useInputColor from "@/hooks/useInputColor";
import Color from "../Color/Color";
import styles from "./ColorPicker.module.css";
import { $color } from "@/store/color";
import { useState } from "preact/hooks";

const ColorPicker = () => {
  const { colors, handleAddColor } = useInputColor();
  const [currentColor, setCurrentColor] = useState($color.get());

  $color.subscribe((c) => {
    setCurrentColor(c);
  });

  return (
    <div className={styles.picker}>
      <input type="color" onChange={handleAddColor} value={currentColor} />
      <nav className={styles.picker__colors}>
        {colors.map((color, index) => {
          return <Color key={index} color={color} />;
        })}
      </nav>
    </div>
  );
};

export default ColorPicker;

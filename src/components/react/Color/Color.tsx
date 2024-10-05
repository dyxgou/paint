import styles from "./Color.module.css";
import { setColor } from "@/store/color";

type ColorProps = Readonly<{
  color: string;
}>;

const Color = ({ color }: ColorProps) => {
  return (
    <svg
      width={20}
      height={20}
      className={styles.color}
      onClick={() => setColor(color)}
    >
      <rect width={20} height={20} fill={color} />
    </svg>
  );
};

export default Color;

import { useState } from "preact/hooks";
import styles from "./Icon.module.css";
import { $tool, setTool, type ToolsKey } from "@/store/tools";

type IconProps = {
  image: string;
  tool: ToolsKey;
};

const Icon = ({ image, tool }: IconProps) => {
  const [isClickedTool, setIsClickedTool] = useState(false);

  $tool.subscribe((t) => {
    if (t === tool) {
      setIsClickedTool(true);
    } else {
      setIsClickedTool(false);
    }
  });

  return (
    <i
      className={`${styles.icon} ${isClickedTool && styles.icon__clicked}`}
      onClick={() => setTool(tool)}
    >
      <img src={image} alt={tool} className={styles.icon__image} />
    </i>
  );
};

export default Icon;

import styles from "./SidebarIcons.module.css";

import Icon from "../Icon/Icon";

const SidebarIcons = () => {
  return (
    <nav className={styles.sidebar__icons}>
      <Icon image="/icons/draw.png" tool="draw" />
      <Icon image="/icons/erase.png" tool="erase" />
      <Icon image="/icons/fill.png" tool="fill" />
      <Icon image="/icons/picker.png" tool="picker" />
      <Icon image="/icons/rectangle.png" tool="rectangle" />
      <Icon image="/icons/ellipse.png" tool="ellipse" />
      <Icon image="/icons/star.png" tool="star" />
      <Icon image="/icons/trash.png" tool="trash" />
    </nav>
  );
};

export default SidebarIcons;

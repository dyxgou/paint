import { atom } from "nanostores";

export const COLORS: string[] = [
  // "black",
  "#000000",
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

export const $color = atom(COLORS[0]);
export const setColor = (color: string) => {
  $color.set(color);
};

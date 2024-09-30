import { atom } from "nanostores";

export const $color = atom("blue");
export const setColor = (color: string) => {
  $color.set(color);
};

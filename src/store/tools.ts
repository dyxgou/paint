import { atom } from "nanostores";

export const TOOLS = [
  "draw",
  "erase",
  "fill",
  "picker",
  "rectangle",
  "ellipse",
  "star",
  "trash",
] as const;

export type ToolsKey = (typeof TOOLS)[number];

export const $tool = atom<ToolsKey>("draw");
export const setTool = (tool: ToolsKey) => {
  $tool.set(tool);
};

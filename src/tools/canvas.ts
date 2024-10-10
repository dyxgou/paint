import { type ToolsKey } from "@/store/tools";
import type { ToolType } from "./tool";
import Drawer from "./drawer";
import Eraser from "./eraser";
import Trash from "./trash";
import Rectangle from "./rectangle";
import Fill from "./fill";
import Picker from "./picker";
import Ellipse from "./ellipse";

export const DEFAULT_LINE_WIDTH = 2;

class Canvas {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #tool: ToolsKey;
  #current: ToolType;
  #color?: string;
  #TOOLS: Record<ToolsKey, ToolType>;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#tool = "draw";
    this.#ctx = this.#canvas.getContext("2d")!;
    this.#TOOLS = {
      draw: new Drawer(this.#ctx),
      erase: new Eraser(this.#ctx),
      ellipse: new Ellipse(this.#ctx),
      fill: new Fill(this.#ctx),
      rectangle: new Rectangle(this.#ctx),
      picker: new Picker(this.#ctx),
      star: new Drawer(this.#ctx),
      trash: new Trash(this.#ctx),
    };

    this.#current = this.#TOOLS[this.#tool];
  }

  resizeCanvas() {
    const dpr = Math.trunc(window.devicePixelRatio);
    const rect = this.#canvas.getBoundingClientRect();

    this.#ctx.scale(dpr, dpr);
    this.#canvas.width = rect.width * dpr;
    this.#canvas.height = rect.height * dpr;
  }

  setTool(tool: ToolsKey) {
    this.#tool = tool;
    this.#current = this.#TOOLS[this.#tool];
    this.#canvas.style.cursor = `url("/icons/${this.#tool}.png") 20 30, auto`;
    this.#applyColor();

    if (this.#tool === "trash") {
      this.#current.onMouseDown();
    }
  }

  setColor(color: string) {
    this.#color = color;
    this.#applyColor();
  }

  #applyColor() {
    if (!this.#current.setColor || !this.#color) return;

    this.#current.setColor(this.#color);
  }

  registerEvents() {
    this.#canvas.addEventListener("mousedown", (event: MouseEvent) => {
      this.#current.onMouseDown(event);
    });
    this.#canvas.addEventListener("mousemove", (event: MouseEvent) => {
      this.#current.onMouseMove(event);
    });
    this.#canvas.addEventListener("mouseup", (event: MouseEvent) => {
      this.#current.onMouseUp(event);
    });
    this.#canvas.addEventListener("mouseleave", (event: MouseEvent) => {
      this.#current.onMouseUp(event);
    });
  }
}

export default Canvas;

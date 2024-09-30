import { type ToolsKey } from "@/store/tools";
import type { ToolType } from "./tool";
import Drawer from "./drawer";
import Eraser from "./eraser";
import Trash from "./trash";
import Rectangle from "./rectangle";

export const DEFAULT_LINE_WIDTH = 1;

class Canvas {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #tool: ToolsKey;
  #current: ToolType;
  #TOOLS: Record<ToolsKey, ToolType>;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#tool = "draw";
    this.#ctx = this.#canvas.getContext("2d")!;
    this.#ctx.lineWidth = DEFAULT_LINE_WIDTH;
    console.log({ l: this.#ctx.lineWidth });
    this.#TOOLS = {
      draw: new Drawer(this.#ctx),
      erase: new Eraser(this.#ctx),
      ellipse: new Drawer(this.#ctx),
      fill: new Drawer(this.#ctx),
      rectangle: new Rectangle(this.#ctx),
      picker: new Drawer(this.#ctx),
      star: new Drawer(this.#ctx),
      trash: new Trash(this.#ctx),
    };

    this.#current = this.#TOOLS[this.#tool];
  }

  resizeCanvas() {
    const CANVAS_CONTAINER_ID = "canvas__container";

    const canvasContainer = document.getElementById(CANVAS_CONTAINER_ID)!;

    this.#canvas.width = canvasContainer?.clientWidth;
    this.#canvas.height = canvasContainer?.clientHeight;
  }

  setTool(tool: ToolsKey) {
    this.#tool = tool;
    this.#current = this.#TOOLS[this.#tool];
    this.#canvas.style.cursor = `url("/icons/${this.#tool}.png") 20 30, auto`;

    if (this.#tool === "trash") {
      this.#current.onMouseDown();
    }
  }

  setColor(color: string) {
    if (!this.#current.setColor) return;

    this.#current.setColor(color);
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

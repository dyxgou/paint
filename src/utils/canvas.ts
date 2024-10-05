import { type ToolsKey } from "@/store/tools";
import type { ToolType } from "./tool";
import Drawer from "./drawer";
import Eraser from "./eraser";
import Trash from "./trash";
import Rectangle from "./rectangle";
import Fill from "./fill";

export const DEFAULT_LINE_WIDTH = 2;

class Canvas {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #tool: ToolsKey;
  #current: ToolType;
  #TOOLS: Record<ToolsKey, ToolType>;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#tool = "draw";
    this.#ctx = this.#canvas.getContext("2d", { alpha: false })!;
    this.#TOOLS = {
      draw: new Drawer(this.#ctx),
      erase: new Eraser(this.#ctx),
      ellipse: new Drawer(this.#ctx),
      fill: new Fill(this.#ctx),
      rectangle: new Rectangle(this.#ctx),
      picker: new Drawer(this.#ctx),
      star: new Drawer(this.#ctx),
      trash: new Trash(this.#ctx),
    };

    this.#current = this.#TOOLS[this.#tool];
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio;
    const rect = this.#canvas.getBoundingClientRect();

    this.#ctx.scale(dpr, dpr);
    this.#canvas.width = rect.width * dpr;
    this.#canvas.height = rect.height * dpr;
    this.#ctx.fillStyle = "white";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
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

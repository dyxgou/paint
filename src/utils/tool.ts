abstract class Tool {
  ctx: CanvasRenderingContext2D;
  isDrawing: boolean;

  constructor(context: CanvasRenderingContext2D) {
    this.isDrawing = false;
    this.ctx = context;
  }
}

interface ToolType {
  setColor?: (color: string) => void;
  onMouseDown(event?: MouseEvent): void;
  onMouseMove(event?: MouseEvent): void;
  onMouseUp(event?: MouseEvent): void;
}

export { type ToolType };
export default Tool;

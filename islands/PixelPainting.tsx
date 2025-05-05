import Canvas, { IDrawer } from "./Canvas.tsx";
import { getRandomInt } from "../utils/get-random-int.ts";

// https://www.youtube.com/watch?v=NbX3RnlAyGU

class Drawer implements IDrawer {
  image: HTMLImageElement | null = null;
  loaded: boolean = false;
  canvas: HTMLCanvasElement | null = null;
  canvasCtx: CanvasRenderingContext2D | null = null;
  n: number = 0;
  first = true;

  constructor() {
  }

  async setup(ctx: CanvasRenderingContext2D) {
    this.image = new Image();
    this.image.src = "./tiago.jpeg";
    this.image.onload = () => {
      this.loaded = true;
      this.canvas = document.createElement("canvas");
      this.canvas.width = this.image?.width ?? 0;
      this.canvas.height = this.image?.height ?? 0;
      this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
      if (this.image) {
        this.canvasCtx.drawImage(
          this.image,
          0,
          0,
          this.image.width,
          this.image.height,
        );
      }
    };
  }

  async loop(ctx: CanvasRenderingContext2D) {
    if (!this.loaded || !this.canvasCtx) {
      return;
    }
    this.n += 1;
    /*
    if(this.n % 5 !== 0) {
      return;
    }
     */
    this.n = 0;

    const x = getRandomInt(0, this.image?.width ?? 0);
    const y = getRandomInt(0, this.image?.height ?? 0);
    const color = this.canvasCtx.getImageData(x, y, 1, 1).data;
    const radius = getRandomInt(2, 6);
    ctx.beginPath();
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
  }
}

export default function PixelPainting() {
  return <Canvas key="canvas" drawer={new Drawer()}></Canvas>;
}

import Canvas, { IDrawer } from "./Canvas.tsx";
import { getRandomInt } from "../utils/get-random-int.ts";
import { CircleImage } from "./CircleImage.tsx";

// https://www.youtube.com/watch?v=7BoJBYh16CQ

class Drawer implements IDrawer {
  circles: CircleImage[];

  constructor() {
    this.circles = [];
  }

  async setup(ctx: CanvasRenderingContext2D) {
    const uris = [
      "https://mdn.github.io/shared-assets/images/examples/rhino.jpg",
      "https://justino.com.br/tiago.jpeg",
      "https://justino.com.br/en.png",
      "https://justino.com.br/br.png",
      "https://justino.com.br/logo.jpg",
    ];
    for (const uri of uris) {
      this.circles.push(
        new CircleImage({
          x: getRandomInt(0, 100),
          y: getRandomInt(0, 100),
          radius: getRandomInt(30, 90),
          uri,
          vx: getRandomInt(1, 5),
          vy: getRandomInt(1, 5),
        }),
      );
    }
  }

  async loop(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const circle of this.circles) {
      circle.clearOverlap();
    }

    for (let i = 0; i < this.circles.length; i++) {
      const circleA = this.circles[i];
      for (let j = i + 1; j < this.circles.length; j++) {
        const circleB = this.circles[j];
        circleA.checkOverlap(circleB);
      }
    }

    for (const circle of this.circles) {
      circle.update(ctx);
    }
    for (const circle of this.circles) {
      circle.display(ctx);
    }
  }
}

export default function AnimatedImage() {
  return <Canvas key="canvas" drawer={new Drawer()}></Canvas>;
}

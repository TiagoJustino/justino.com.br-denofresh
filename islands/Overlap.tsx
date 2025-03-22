import Canvas, { IDrawer } from './Canvas.tsx';
import { Circle } from './Circle.tsx';
import { getRandomInt } from '../utils/get-random-int.ts';

// https://www.youtube.com/watch?v=V7k5bFQbhG0

class Drawer implements IDrawer {
  circles;

  constructor() {
    this.circles = [];
    const colors = ['blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black'];
    for (const color of colors) {
      this.circles.push(
        new Circle({
          x: getRandomInt(0, 100),
          y: getRandomInt(0, 100),
          radius: getRandomInt(30, 90),
          color: color,
          vx: getRandomInt(1, 5),
          vy: getRandomInt(1, 5),
        }),
      );
    }
  }

  async setup(ctx: CanvasRenderingContext2D) {
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

export default function Overlap() {
  return <Canvas key='canvas' drawer={new Drawer()}></Canvas>;
}

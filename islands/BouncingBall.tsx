import Canvas, { IDrawer } from './Canvas.tsx';

// https://www.youtube.com/watch?v=YIKRXl3wH8Y

class Drawer implements IDrawer {
  circle;

  constructor() {
    this.circle = {
      x: 100,
      y: 100,
      radius: 50,
      color: 'red',
      vx: 2,
      vy: 2,
    };
  }

  async setup(ctx: CanvasRenderingContext2D) {
  }

  async loop(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (
      this.circle.x + this.circle.radius > ctx.canvas.width ||
      this.circle.x - this.circle.radius < 0
    ) {
      this.circle.vx = -this.circle.vx;
    }
    if (
      this.circle.y + this.circle.radius > ctx.canvas.height ||
      this.circle.y - this.circle.radius < 0
    ) {
      this.circle.vy = -this.circle.vy;
    }

    this.circle.x += this.circle.vx;
    this.circle.y += this.circle.vy;

    ctx.arc(
      this.circle.x,
      this.circle.y,
      this.circle.radius,
      0,
      Math.PI * 2,
      true,
    );
    ctx.fillStyle = this.circle.color;
    ctx.fill();
    ctx.stroke();
  }
}

export default function BouncingBall() {
  return <Canvas key='canvas' drawer={new Drawer()}></Canvas>;
}

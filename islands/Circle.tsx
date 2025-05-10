export class Circle {
  x: number;
  y: number;
  radius: number;
  private color: string;
  vx: number;
  vy: number;
  overlaping: boolean;

  constructor(
    input: {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    },
  ) {
    this.x = input.x;
    this.y = input.y;
    this.radius = input.radius;
    this.color = input.color;
    this.vx = input.vx;
    this.vy = input.vy;
    this.overlaping = false;
  }

  getColor() {
    if (this.overlaping) {
      return 'red';
    }
    return this.color;
  }

  checkOverlap(other: Circle) {
    const distance = Math.sqrt(
      Math.pow(this.x - other.x, 2) +
        Math.pow(this.y - other.y, 2),
    );
    if (distance < this.radius + other.radius) {
      this.overlaping = true;
      other.overlaping = true;
      return true;
    }
    return false;
  }

  clearOverlap() {
    this.overlaping = false;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (
      this.x + this.radius > ctx.canvas.width ||
      this.x - this.radius < 0
    ) {
      this.vx = -this.vx;
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius;
    }
    if (this.x + this.radius > ctx.canvas.width) {
      this.x = ctx.canvas.width - this.radius;
    }
    if (
      this.y + this.radius > ctx.canvas.height ||
      this.y - this.radius < 0
    ) {
      this.vy = -this.vy;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }
    if (this.y + this.radius > ctx.canvas.height) {
      this.y = ctx.canvas.height - this.radius;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  display(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      true,
    );
    ctx.fillStyle = this.getColor();
    ctx.fill();
    ctx.stroke();
  }
}

export class CircleImage {
  x: number;
  y: number;
  radius: number;
  uri: string;
  vx: number;
  vy: number;
  overlaping: boolean;
  image: HTMLImageElement;

  constructor(
    input: {
      x: number;
      y: number;
      radius: number;
      uri: string;
      vx: number;
      vy: number;
    },
  ) {
    this.x = input.x;
    this.y = input.y;
    this.radius = input.radius;
    this.uri = input.uri;
    this.vx = input.vx;
    this.vy = input.vy;
    this.overlaping = false;
    this.image = new Image();
    this.image.src = this.uri;
  }

  checkOverlap(other: CircleImage) {
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
    if (this.overlaping) {
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2,
        true,
      );
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 0.4;
    }
    ctx.drawImage(
      this.image,
      this.x - this.radius,
      this.y - this.radius,
      2 * this.radius,
      2 * this.radius,
    );
    ctx.globalAlpha = 1;
  }
}

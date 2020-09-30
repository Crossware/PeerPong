/*
 *  Ball Object
 */

export class Ball {
  posX;
  posY;
  velocityX = 1;
  velocityY = 1;
  radius = 5;
  diameter = 2 * this.radius;
  initialSpeed;
  speed;
  canvas;
  ctx;

  constructor(canvas, posX, posY, speed) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.initialSpeed = speed;
    this.speed = this.initialSpeed;
    this.ctx = canvas.getContext('2d');
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#4ecca3';
    this.ctx.lineWidth = 10;
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

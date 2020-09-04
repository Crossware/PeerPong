/*
 *  Ball Object
 */

export class Ball {
  posX;
  posY;
  speed;
  canvas;
  ctx;

  constructor(canvas, posX, posY, speed) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.ctx = canvas.getContext("2d");
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#4ecca3";
    this.ctx.lineWidth = 10;
    this.ctx.arc(this.posX, this.posY, 5, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

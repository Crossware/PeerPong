/*
 *  Paddle Object
 */

export class Paddle {
  canvas;
  posX;
  posY;
  speed;
  ctx;

  constructor(canvas, posX, posY, speed) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.ctx = canvas.getContext('2d');
  }

  get posX() {
    return this.posX;
  }

  get posY() {
    return this.posY;
  }

  get speed() {
    return this.speed;
  }

  /**
   * @param {any} speed
   */
  set speed(speed) {
    this.speed = speed;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#eeeeee';
    this.ctx.fillRect(this.posX, this.posY, 10, 100);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

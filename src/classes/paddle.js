/*
 *  Paddle Object
 */

export class Paddle {
  canvas;
  width = 10;
  height = 100;
  initialPosX;
  initialPosY;
  posX;
  posY;
  speed;
  ctx;

  constructor(canvas, posX, posY, speed) {
    this.canvas = canvas;
    this.initialPosX = posX;
    this.initialPosY = posY;
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
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  reset() {
    this.posX = this.initialPosX;
    this.posY = this.initialPosY;
  }
}

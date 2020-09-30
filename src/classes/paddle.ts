/*
 *  Paddle Object
 */

export class Paddle {
  canvas;
  width = 10;
  height = 100;
  initialPosX;
  initialPosY;
  _posX;
  _posY;
  _speed;
  ctx;

  constructor(canvas, posX, posY, speed) {
    this.canvas = canvas;
    this.initialPosX = posX;
    this.initialPosY = posY;
    this._posX = posX;
    this._posY = posY;
    this._speed = speed;
    this.ctx = canvas.getContext('2d');
  }

  get posX() {
    return this._posX;
  }

  get posY() {
    return this._posY;
  }

  set posX(posX) {
    this._posX = posX;
  }

  set posY(posY) {
    this._posY = posY;
  }

  get speed() {
    return this._speed;
  }

  /**
   * @param {any} speed
   */
  set speed(speed) {
    this._speed = speed;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#eeeeee';
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  reset() {
    this._posX = this.initialPosX;
    this._posY = this.initialPosY;
  }
}

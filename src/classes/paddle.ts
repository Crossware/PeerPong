/*
 *  Paddle Object
 */

export class Paddle {
  private canvas: HTMLCanvasElement;
  private width: number = 10;
  private height: number = 100;
  private initialPosX: number;
  private initialPosY: number;
  private _posX: number;
  private _posY: number;
  private _speed: number;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, posX: number, posY: number, speed: number) {
    this.canvas = canvas;
    this.initialPosX = posX;
    this.initialPosY = posY;
    this._posX = posX;
    this._posY = posY;
    this._speed = speed;
    this.ctx = canvas.getContext('2d');
  }

  public get posX() {
    return this._posX;
  }

  public get posY() {
    return this._posY;
  }

  public set posX(posX: number) {
    this._posX = posX;
  }

  public set posY(posY: number) {
    this._posY = posY;
  }

  public get speed() {
    return this._speed;
  }

  public set speed(speed: number) {
    this._speed = speed;
  }

  public draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#eeeeee';
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public reset() {
    this._posX = this.initialPosX;
    this._posY = this.initialPosY;
  }
}

/*
 *  Score Object
 */

export class Score {
  posX;
  posY;
  size = 10;
  canvas;
  text;
  ctx;

  constructor(canvas, posX, posY, size, text) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.text = text;
    this.ctx = canvas.getContext('2d');
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.font = `${this.size}px press_start_2pregular`;
    var gradient = this.ctx.createLinearGradient(0, 0, 50, 50);
    gradient.addColorStop(0, '#1a2a6c');
    gradient.addColorStop(1, '#b21f1f');
    this.ctx.fillStyle = gradient;
    this.ctx.fillText(this.text, this.posX, this.posY);
    this.ctx.closePath();
  }
}

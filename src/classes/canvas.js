import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

export class Canvas {}

var myPaddle = new Paddle(canvas, 50, 350, 0);
var enemyPaddle = new Paddle(canvas, 1140, 350, 0);

var myBall = new Ball(canvas, 600, 400, 0);

drawDivider();
myBall.draw();
myPaddle.draw();
enemyPaddle.draw();

function drawDivider() {
  var i;
  var posX = 595;
  var posY = 5;
  var width = 10;
  var height = 15;
  var spacer = 15;

  var gradient = ctx.createLinearGradient(posX, 0, posX, 800);
  gradient.addColorStop(0, '#1a2a6c');
  gradient.addColorStop(1 / 3, '#b21f1f');
  gradient.addColorStop(1, '#fdbb2d');

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.fillRect(posX, 0, width, 800);
  ctx.stroke();
  ctx.closePath();

  for (i = 0; i < 35; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#393e46';
    ctx.fillRect(posX, posY + 15, width, height);
    ctx.stroke();
    ctx.closePath();
    posY = posY + height + spacer;
  }
}

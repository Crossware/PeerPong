import { Paddle } from './paddle.js';
import { Ball } from './ball.js';

// window.addEventListener('keydown', function (e) {
//   keys[e.keyCode] = true;
// });

// window.addEventListener('keyup', function (e) {
//   delete keys[e.keyCode];
// });

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
const speed = 5;
const keys = [];

export class Canvas {}

var myPaddle = new Paddle(canvas, 10, 350, 0);
export var enemyPaddle = new Paddle(canvas, 1180, 350, 0);
var myBall = new Ball(canvas, 600, 400, 0);

function drawDivider() {
  var i;
  var posX = 595;
  var posY = 5;
  var width = 10;
  var height = 15;
  var spacer = 15;

  var gradient = ctx.createLinearGradient(posX, 0, posX, 800);
  gradient.addColorStop(0, '#1a2a6c');
  gradient.addColorStop(1 / 2, '#b21f1f');
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

export function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDivider();
  myBall.draw();
  myPaddle.draw();
  enemyPaddle.draw();
  moveMyPaddle();
  //moveEnemyPaddle();
  requestAnimationFrame(animate);
}
//animate();

function moveMyPaddle() {
  /* 38 up arrow, 87  W key */
  if ((keys[38] || keys[87]) && myPaddle.posY > 0) {
    console.log(myPaddle.posY);
    myPaddle.posY -= speed;
  }

  /* 38 up arrow, 87  W key */
  if ((keys[40] || keys[83]) && myPaddle.posY < 700) {
    console.log(myPaddle.posY);
    myPaddle.posY += speed;
  }
}

function moveEnemyPaddle(enemyPosY) {
  console.log(enemyPosY);
  //enemyPaddle.posY = enemyPosY;
}

function getPallTrajectory() {}

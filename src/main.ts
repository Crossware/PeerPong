/*
 *  Stuff
 */

import Message from './classes/Message';
import Paddle from './classes/Paddle';
import Ball from './classes/Ball';
import Score from './classes/Score';
import Peer from 'peerjs';

window.addEventListener('keydown', (e) => {
  keys[e.keyCode] = true;
});

window.addEventListener('keyup', (e) => {
  delete keys[e.keyCode];
});

document.getElementById('enemyId').addEventListener('click', getEnemyId);
document.getElementById('myId').addEventListener('click', getMyId);
document.getElementById('sendMessage').addEventListener('click', sendChat);
document.getElementById('challengeUser').addEventListener('click', challengeUser);

var canvas: any = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

const speed = 5;
const keys = [];

var leftPaddle = new Paddle(canvas, 10, 350, 10);
var rightPaddle = new Paddle(canvas, 1180, 350, 10);
var myBall = new Ball(canvas, 600, 400, speed);
var myPaddle;
var enemyPaddle;

var leftScore = new Score(canvas, 250, 150, 50, '0');
var rightScore = new Score(canvas, 850, 150, 50, '0');
var myScore;
var enemyScore;

var startPlaying = false;
var iAmHost = false;

var canvasWidth = 1200;
var canvasHeight = 800;

const myself = new Peer(null, {
  debug: 2,
});
let myId;
let enemyId;
let connection;

init();

function drawDivider() {
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

  for (let i = 0; i < 35; i++) {
    ctx.beginPath();
    ctx.fillStyle = '#393e46';
    ctx.fillRect(posX, posY + 15, width, height);
    ctx.stroke();
    ctx.closePath();
    posY = posY + height + spacer;
  }
}

function animate() {
  if (startPlaying) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDivider();
    leftScore.draw();
    rightScore.draw();
    myBall.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    updateHostPaddle(myPaddle);
    updateHostBallPosition(myBall);
  }

  requestAnimationFrame(animate);
}

function updateHostPaddle(paddle: Paddle) {
  const upKeyPressed = (keys[38] || keys[87]) && paddle.posY > 0;
  const downKeyPressed = (keys[40] || keys[83]) && paddle.posY < 700;
  const keyPressed = upKeyPressed || downKeyPressed;

  if (upKeyPressed) paddle.moveUp();
  if (downKeyPressed) paddle.moveDown();

  if (keyPressed) {
    console.log(paddle.posY);
    send(new Message(paddle.posY));
  }
}

myself.on('open', function (id) {
  console.log('on open My peer Id is: ' + id);
  myId = id;
});

myself.on('connection', (playerConnection) => {
  console.log('on connection: ' + playerConnection);
  
  connection = playerConnection;

  if(connection.open) {
    console.log('Successfully connected to: ' + connection.peer);
    myScore = rightScore;
    enemyScore = leftScore;
    myPaddle = rightPaddle;
    enemyPaddle = leftPaddle;
    startPlaying = true;
    enemyId = connection.peer;
    listen();
  } else {
    alert('invalid player connection');
  }
});

function listen() {
  console.log('listen');
  connection.on('open', () => {
    connection.on('data', (message) => {
      var chatMessage = message.chat;
      updateEnemyPaddlePosition(message);
      updateEnemyBallPosition(message);
      resetEnemyPaddles(message);
      updateEnemyScoreFromMessage(message);
      console.log(message);
      console.log('Data received: ');
      connection.send('Connection Established');
    });
  });

  connection.on('close', () => {
    console.log('Connection Lost');
    alert('connection was closed');
    connection = null;
  });
}

function send(message) {
  if(connection.open) {
    console.log('Sending: ' + message);
    connection.send(message);
  }
}

function getEnemyId(): string {
  const url: string = window.location.href;
  const id: string = url.split('?userId=')[1];
  var enemyIdInput: HTMLInputElement = getInputElementById('enemyIdInput');
  var enemyId: string = enemyIdInput.value;

  if (enemyId) {
    return enemyId;
  }
  //  else if (enemyIdInput) {
  //   console.log('Enemy Id from input: ' + enemyId);
  //   return enemyIdInput;
  // }
  console.log('Enemy Id from header: ' + id);
  return id;
}

function getMyId() {
  console.log('getting id');
  var input = document.createElement('input');
  input.setAttribute('value', myId);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  console.log(myId);
  return result;
}

function getInputElementById(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}

function sendChat() {
  var inputField: HTMLInputElement = getInputElementById('textInput');
  console.log(inputField.value);
  if(inputField.value == null || inputField.value == '') {
    alert('cannot send message empty message!');
  } else {
    var myMessage = new Message(null, null, null, inputField.value);
    send(myMessage);
  }
}

function populateEnemyId() {
  var enemyIdInput: HTMLInputElement = getInputElementById('enemyIdInput');
  var enemyIdFromHeader = getEnemyId();
  enemyId = enemyIdFromHeader;
  if (enemyId) {
    enemyIdInput.value = enemyId;
  }
}

function challengeUser() {
  //TODO: Add error message if no user Id specified and success message when connected successfully
  var enemyId = getEnemyId();

  if (connection == null || connection == undefined) {
    console.log('sender connection is null, attempting to connect to ' + enemyId);
    if(enemyId == null || enemyId == undefined) {
      alert('enemy id is empty!');
    } else {
      connection = myself.connect(enemyId, { reliable: true });
      if (connection.open) {
        alert('successfully connected to peer! ' + connection.peer);
      } else {
        alert('failed to connect to ' + enemyId);
      }
    }
  }
}

function updateEnemyPaddlePosition(message) {
  if (message.paddlePosY) {
    enemyPaddle.posY = message.paddlePosY;
  }
}

function updateEnemyBallPosition(message) {
  if (!iAmHost) {
    myBall.posX = message.ballPosX;
    myBall.posY = message.ballPosY;
  }
}

function updateHostBallPosition(ball) {
  if (!iAmHost) {
    return;
  }
  var newBallX = ball.posX + ball.velocityX * ball.speed;
  var newBallY = ball.posY + ball.velocityY * ball.speed;
  var paddleOffset = 10; // distance between paddle and back wall

  var intersectX, intersectY;

  //Top and bottom edges, simply bounce
  if (newBallY < 0) {
    newBallY = -newBallY;
    ball.velocityY = -ball.velocityY;
  } else if (newBallY + ball.diameter > canvasHeight - 1) {
    newBallY -= 2 * (newBallY + ball.diameter - (canvasHeight - 1));
    ball.velocityY = -ball.velocityY;
  }

  //Left paddle collisions
  if (newBallX < paddleOffset + myPaddle.width && ball.posX >= paddleOffset + myPaddle.width) {
    intersectX = paddleOffset + myPaddle.width;
    intersectY =
      ball.posY -
      ((ball.posX - (paddleOffset + myPaddle.width)) * (ball.posY - newBallY)) /
        (ball.posX - newBallX);
    if (intersectY >= myPaddle.posY && intersectY <= myPaddle.posY + myPaddle.height) {
      var angle = calculateAngle(enemyPaddle, ball);
      var ballSpeed = Math.sqrt(ball.velocityY * ball.velocityY + ball.velocityY * ball.velocityY);
      ball.velocityX = ballSpeed * Math.cos(angle);
      ball.velocityY = ballSpeed * Math.sin(angle);
      ball.speed += 0.2;
    }
  }

  //Right paddle collision
  if (
    newBallX > canvasWidth - paddleOffset - enemyPaddle.width &&
    ball.posX <= canvasWidth - paddleOffset - enemyPaddle.width
  ) {
    intersectX = canvasWidth - paddleOffset - enemyPaddle.width;
    intersectY =
      ball.posY -
      ((ball.posX - (canvasWidth - paddleOffset - enemyPaddle.width)) * (ball.posY - newBallY)) /
        (ball.posX - newBallX);
    if (intersectY >= enemyPaddle.posY && intersectY <= enemyPaddle.posY + enemyPaddle.height) {
      var angle = calculateAngle(enemyPaddle, ball);
      var ballSpeed = Math.sqrt(ball.velocityX * ball.velocityX + ball.velocityY * ball.velocityY);
      ball.velocityX = -1 * ballSpeed * Math.cos(angle);
      ball.velocityY = ballSpeed * Math.sin(angle);
      ball.speed += 0.2;
    }
  }

  //Left and right edges, add to the score and reset the ball
  if (newBallX < 0) {
    updateEnemyScore();
    resetHostPaddles();
    resetBall(ball);
    return;
  } else if (newBallX + myBall.getDiameter() > canvasWidth - 1) {
    updateHostScore();
    resetHostPaddles();
    resetBall(ball);
    return;
  }

  var myMessage = new Message(null, ball.posX, ball.posY, null);
  send(myMessage);
  ball.posX = newBallX;
  ball.posY = newBallY;
}

function calculateAngle(paddle, ball) {
  let angle = 0;
  //Top of paddle
  if (ball.posY < paddle.posY + paddle.height / 2) {
    // then -1 * Math.PI / 4 = -45deg
    angle = (-1 * Math.PI) / 4;
    //Bottom of paddle
  } else if (ball.posY > paddle.posY + paddle.height / 2) {
    // then angle will be Math.PI / 4 = 45deg
    angle = Math.PI / 4;
  }
  return angle;
}

function updateHostScore() {
  myScore.text++;

  send(new Message(null, null, null, null, null, myScore.text));
}

function updateEnemyScoreFromMessage(message) {
  if (message.hostScore) {
    enemyScore.text = message.hostScore;
  }

  if (message.enemyScore) {
    myScore.text = message.enemyScore;
  }
}

function updateEnemyScore() {
  enemyScore.text++;

  send(new Message(null, null, null, null, null, null, enemyScore.text));
}

function resetHostPaddles() {
  myPaddle.reset();
  enemyPaddle.reset();

  var myMessage = new Message(null, null, null, null, true);
  send(myMessage);
}

function resetEnemyPaddles(message) {
  if (message.paddleReset) {
    myPaddle.reset();
    enemyPaddle.reset();
  }
}

function resetBall(ball) {
  ball.posX = canvasWidth / 2;
  ball.posY = canvasHeight / 2;
  ball.velocityX = 1;
  ball.velocityY = 1;
  ball.speed = ball.initialSpeed;
}

function init() {
  populateEnemyId();
  animate();
}

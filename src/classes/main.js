/*
 *  Stuff
 */

import { Message } from './message.js';
import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { Score } from './score.js';

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

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
const speed = 5;
const keys = [];
var leftPaddle = new Paddle(canvas, 10, 350, 10);
var rightPaddle = new Paddle(canvas, 1180, 350, 10);
var myBall = new Ball(canvas, 600, 400, 5);
var myPaddle;
var enemyPaddle;

var leftScore = new Score(canvas, 250, 150, 50, 0);
var rightScore = new Score(canvas, 850, 150, 50, 0);
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
let senderConnection;

init();

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

function updateHostPaddle(paddle) {
  /* 38 up arrow, 87  W key */
  if ((keys[38] || keys[87]) && paddle.posY > 0) {
    console.log(paddle.posY);
    paddle.posY -= paddle.speed;

    var myMessage = new Message(paddle.posY, null, null);
    send(myMessage);
  }

  /* 38 up arrow, 87  W key */
  if ((keys[40] || keys[83]) && paddle.posY < 700) {
    console.log(paddle.posY);
    paddle.posY += paddle.speed;

    var myMessage = new Message(paddle.posY, null, null);
    send(myMessage);
  }
}

myself.on('open', function (id) {
  console.log('My peer Id is: ' + id);
  myId = id;
  console.log(myId);
});

myself.on('connection', (playerConnection) => {
  if (senderConnection == null || senderConnection == undefined) {
    myScore = rightScore;
    enemyScore = leftScore;
    myPaddle = rightPaddle;
    enemyPaddle = leftPaddle;
    startPlaying = true;
  }

  connection = playerConnection;
  console.log('Successfully connected to: ' + connection.peer);
  enemyId = connection.peer;
  listen();
});

function listen() {
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
    connection = null;
  });
}

function send(message) {
  challengeUser();
  console.log('Sending: ');
  console.log(message);
  senderConnection.send(message);
}

function getEnemyId() {
  const url = window.location.href;
  const Id = url.split('?userId=')[1];
  var enemyIdInput = document.getElementById('enemyIdInput').value;

  if (enemyId != null || enemyId != undefined) {
    return enemyId;
  } else if (enemyIdInput) {
    console.log('Enemy Id from input: ' + enemyId);
    return enemyIdInput;
  } else {
    console.log('Enemy Id from header: ' + Id);
    return Id;
  }
}

function getMyId() {
  var input = document.createElement('input');
  input.setAttribute('value', myId);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  console.log(myId);
  return result;
}

function sendChat() {
  var inputField = document.getElementById('textInput');
  var playerId = getEnemyId();
  console.log(playerId);
  console.log(inputField.value);
  var myMessage = new Message(null, null, inputField.value);
  send(myMessage);
}

function populateEnemyId() {
  var enemyIdInput = document.getElementById('enemyIdInput');
  var enemyIdFromHeader = getEnemyId();
  enemyId = enemyIdFromHeader;
  if (enemyId) {
    enemyIdInput.value = enemyId;
  }
}

function challengeUser() {
  //TODO: Add error message if no user Id specified and success message when connected successfully
  var playerId = getEnemyId();
  if (senderConnection == null || senderConnection == undefined) {
    senderConnection = myself.connect(playerId, { reliable: true });
    if (connection == null || connection == undefined) {
      myScore = leftScore;
      enemyScore = rightScore;
      myPaddle = leftPaddle;
      enemyPaddle = rightPaddle;
      iAmHost = true;
      startPlaying = true;
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
      ball.posY - ((ball.posX - (paddleOffset + myPaddle.width)) * (ball.posY - newBallY)) / (ball.posX - newBallX);
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
  } else if (newBallX + myBall.diameter > canvasWidth - 1) {
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

function countScore(score, ball) {
  updateHostScore();
  resetHostPaddles();
  resetBall(ball);
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
}

function init() {
  populateEnemyId();
  animate();
}

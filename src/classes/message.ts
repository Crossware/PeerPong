/*
 *  Used to send messages between peers.
 */

export default class Message {
  paddlePosY;
  ballPosX;
  ballPosY;
  chat;
  paddleReset;
  hostScore;
  enemyScore;

  constructor(
    paddlePosY = null,
    ballPosX = null,
    ballPosY = null,
    chat = null,
    paddleReset = null,
    hostScore = null,
    enemyScore = null
  ) {
    this.paddlePosY = paddlePosY;
    this.ballPosX = ballPosX;
    this.ballPosY = ballPosY;
    this.chat = chat;
    this.paddleReset = paddleReset;
    this.hostScore = hostScore;
    this.enemyScore = enemyScore;
  }
}

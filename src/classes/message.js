/*
 *  Used to send messages between peers.
 */

export class Message {
  paddlePosY;
  ballPosX;
  ballPosY;
  chat;
  paddleReset;
  hostScore;
  enemyScore;

  constructor(paddlePosY, ballPosX, ballPosY, chat, paddleReset, hostScore, enemyScore) {
    this.paddlePosY = paddlePosY;
    this.ballPosX = ballPosX;
    this.ballPosY = ballPosY;
    this.chat = chat;
    this.paddleReset = paddleReset;
    this.hostScore = hostScore;
    this.enemyScore = enemyScore;
  }
}

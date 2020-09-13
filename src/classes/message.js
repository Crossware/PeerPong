/*
 *  Used to send messages between peers.
 */

export class Message {
  paddle;
  ball;
  chat;

  constructor(paddle, ball, chat) {
    this.paddle = paddle;
    this.ball = ball;
    this.chat = chat;
  }
}

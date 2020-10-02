/*
 *  Used to send messages between peers.
 */

export default class Message {
  private paddlePosY: number;
  private ballPosX: number;
  private ballPosY: number;
  private chat: number;
  private paddleReset: number;
  private hostScore: number;
  private enemyScore: number;

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

  public getMessageObject(): any {
    return {
      paddlePosY: this.paddlePosY,
      ballPosX: this.ballPosX,
      ballPosY: this.ballPosY,
      chat: this.chat,
      paddleReset: this.paddleReset,
      hostScore: this.hostScore,
      enemyScore: this.enemyScore,
    };
  }
}

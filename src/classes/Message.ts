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

/*
Uncaught Error: Type "function(e,t,r,n,i,o,a){void 0===e&&(e=null),void 0===t&&(t=null),void 0===r&&(r=null),void 0===n&&(n=null),void 0===i&&(i=null),void 0===o&&(o=null),void 0===a&&(a=null),this.paddlePosY=e,this.ballPosX=t,this.ballPosY=r,this.chat=n,this.paddleReset=i,this.hostScore=o,this.enemyScore=a}" not yet supported
 */

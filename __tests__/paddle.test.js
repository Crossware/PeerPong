import { Paddle } from '../paddle';

let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
});

describe('Draws', () => {
  it('paddle', () => {
    var myPaddle = new Paddle(canvas, 10, 10, 0);
    myPaddle.draw();

    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(10, 10, 10, 100);
  });
});

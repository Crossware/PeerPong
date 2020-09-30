import { Paddle } from '../classes/paddle';

let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
});

describe('Paddle', () => {
  it('should render', () => {
    var myPaddle = new Paddle(canvas, 10, 10, 0);
    myPaddle.draw();

    expect(ctx.fillStyle).toBe('#eeeeee');
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(10, 10, 10, 100);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
  });
});

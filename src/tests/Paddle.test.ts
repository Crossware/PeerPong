import Paddle from '../classes/Paddle';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const mockFillRectFunction = jest.fn((x: number, y: number, w: number, h: number) => {});
const mockStrokeFunction = jest.fn();

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  ctx.fillRect = mockFillRectFunction;
  ctx.stroke = mockStrokeFunction;
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

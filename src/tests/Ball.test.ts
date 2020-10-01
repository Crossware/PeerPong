import Ball from '../classes/Ball';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const mockArcFunction = jest.fn(
  (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
  ) => {}
);
const mockStrokeFunction = jest.fn();

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  ctx.arc = mockArcFunction;
  ctx.stroke = mockStrokeFunction;
});

describe('Ball', () => {
  it('should render', () => {
    var myBall = new Ball(canvas, 10, 10, 0);
    myBall.draw();

    expect(ctx.strokeStyle).toBe('#4ecca3');
    expect(ctx.lineWidth).toBe(10);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledWith(10, 10, 5, 0, 2 * Math.PI);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
  });
});

export class Point
{
  constructor(public x: number, public y: number)
  {
  }

  public moveBy(dx: number, dy: number)
  {
    this.x += dx;
    this.y += dy;
  }
}
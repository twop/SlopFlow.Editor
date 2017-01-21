export class Point
{
  constructor(public x: number, public y: number)
  {
  }

  public moveBy(dx: number, dy: number):this
  {
    this.x += dx;
    this.y += dy;
    return this;
  }

  public add(point:Point):this
  {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  public subtract(point:Point):this
  {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  public copy():Point
  {
    return new Point(this.x, this.y);
  }
}
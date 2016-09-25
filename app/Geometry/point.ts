export class Point
{
  constructor(public x: number, public y: number)
  {
  }

  public moveBy(dx: number, dy: number):void
  {
    this.x += dx;
    this.y += dy;
  }

  public add(point:Point):void
  {
    this.x += point.x;
    this.y += point.y;
  }

  public subtract(point:Point):void
  {
    this.x -= point.x;
    this.y -= point.y;
  }

  public copy():Point
  {
    return new Point(this.x, this.y);
  }
}
import {Point} from './point'

export class Rectangle
{
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public contains(point: Point)
  {
    return ((point.x >= this.x) && (point.x <= (this.x + this.width)) && (point.y >= this.y) && (point.y <= (this.y + this.height)));
  }

  public inflate(dx: number, dy: number)
  {
    this.x -= dx;
    this.y -= dy;
    this.width += dx + dx + 1;
    this.height += dy + dy + 1;
  }

  public moveBy(deltaX: number, deltaY: number)
  {
     this.x += deltaX;
     this.y += deltaY;
  }

  public union(rectangle: Rectangle)
  {
    var x1 = (this.x < rectangle.x) ? this.x : rectangle.x;
    var y1 = (this.y < rectangle.y) ? this.y : rectangle.y;
    var x2 = ((this.x + this.width) < (rectangle.x + rectangle.width)) ? (rectangle.x + rectangle.width) : (this.x + this.width);
    var y2 = ((this.y + this.height) < (rectangle.y + rectangle.height)) ? (rectangle.y + rectangle.height) : (this.y + this.height);
    return new Rectangle(x1, y1, x2 - x1, y2 - y1);
  }

  public get topLeft(): Point
  {
    return new Point(this.x, this.y);
  }

  public get center(): Point
  {
    return new Point((this.x + this.width)/2, (this.y + this.height)/2);
  }
  public get right(): number
  {
    return this.x + this.width;
  }

  public clone(): Rectangle
  {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
}
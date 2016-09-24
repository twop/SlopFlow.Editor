import {Rectangle} from '../Geometry/rectangle'

export class Port
{
  constructor(public name: string, public type: string)
  { }

  public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

  public setSizeAndCenter(centerX:number, centerY:number, size:number): void
  {
    this.rectangle.width = size;
    this.rectangle.height = size;

    this.rectangle.x = centerX - size/2; 
    this.rectangle.y = centerY - size/2;
  }
}
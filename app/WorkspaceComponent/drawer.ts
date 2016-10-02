import {Rectangle} from '../Geometry/rectangle'
import {Point} from '../Geometry/point'

export class Drawer
{
  constructor(private context: CanvasRenderingContext2D)
  {
  }

  public offset:Point = new Point(0,0);

  paintRect(rectangle: Rectangle, borderStyle: string, shadowColor: string = "black"): void
  {
    this.context.save();
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    this.context.shadowBlur = 1;
    this.context.shadowColor = shadowColor;

    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = borderStyle;
    this.context.rect(rectangle.x + this.offset.x, rectangle.y + this.offset.y, rectangle.width, rectangle.height);
    this.context.stroke();
    this.context.restore();
  }

  paintFilledRect(rectangle: Rectangle, borderStyle: string, fillStyle: string, shadowColor: string = "black"): void
  {
    this.context.save();
    this.context.fillStyle = fillStyle;
    this.context.fillRect(rectangle.x + this.offset.x, rectangle.y + this.offset.y, rectangle.width, rectangle.height);
    this.paintRect(rectangle, borderStyle, shadowColor);
    this.context.restore();
  }

  paintText(text: string, x: number, y:number, font: string, textColor: string, shadowColor: string = "black"): void
  {
    this.context.save();
    this.context.font = font;
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    // context.shadowBlur = 2;
    // context.shadowColor = shadowColor;
    this.context.fillStyle = textColor;
    //context.lineWidth = 1;
    this.context.fillText(text, x + this.offset.x, y + this.offset.y);
    this.context.restore();
  }

  measureTextWidth(text:string, font: string):number
  {
    var width:number = 0;
    this.context.save();
    this.context.font = font;
    width =this.context.measureText(text).width;
    this.context.restore();
    return width;
  }
}
import {Rectangle} from '../Geometry/rectangle'
import {Point} from '../Geometry/point'

export class Drawer
{
  public offset:Point = new Point(0,0);

  paintRect(context: CanvasRenderingContext2D, rectangle: Rectangle, borderStyle: string, shadowColor: string = "black"): void
  {
    context.save();
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    context.shadowBlur = 1;
    context.shadowColor = shadowColor;

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = borderStyle;
    context.rect(rectangle.x + this.offset.x, rectangle.y + this.offset.y, rectangle.width, rectangle.height);
    context.stroke();
    context.restore();
  }

  paintFilledRect(context: CanvasRenderingContext2D, rectangle: Rectangle, borderStyle: string, fillStyle: string, shadowColor: string = "black"): void
  {
    context.save();
    context.fillStyle = fillStyle;
    context.fillRect(rectangle.x + this.offset.x, rectangle.y + this.offset.y, rectangle.width, rectangle.height);
    this.paintRect(context, rectangle, borderStyle, shadowColor);
    context.restore();
  }

  paintText(context: CanvasRenderingContext2D, text: string, x: number, y:number, font: string, textColor: string, shadowColor: string = "black"): void
  {
    context.save();
    context.font = font;
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    // context.shadowBlur = 2;
    // context.shadowColor = shadowColor;
    context.fillStyle = textColor;
    //context.lineWidth = 1;
    context.fillText(text, x + this.offset.x, y + this.offset.y);
    context.restore();
  }
}
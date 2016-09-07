import {Rectangle} from '../Model/rectangle'
import {Point} from '../Model/point'

export class Drawer
{
  static paintRect(context: CanvasRenderingContext2D, rectangle: Rectangle, borderStyle: string, shadowColor: string = "black"): void
  {
    context.save();
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    context.shadowBlur = 1;
    context.shadowColor = shadowColor;

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = borderStyle;
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.stroke();
    context.restore();
  }

  static paintFilledRect(context: CanvasRenderingContext2D, rectangle: Rectangle, borderStyle: string, fillStyle: string, shadowColor: string = "black"): void
  {
    context.save();
    context.fillStyle = fillStyle;
    context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    Drawer.paintRect(context, rectangle, borderStyle, shadowColor);
    context.restore();
  }

  static paintText(context: CanvasRenderingContext2D, text: string, x: number, y:number, font: string, textColor: string, shadowColor: string = "black"): void
  {
    context.save();
    context.font = font;
    // context.shadowOffsetX = 1;
    // context.shadowOffsetY = 1;
    // context.shadowBlur = 2;
    // context.shadowColor = shadowColor;
    context.fillStyle = textColor;
    //context.lineWidth = 1;
    context.fillText(text, x, y);
    context.restore();
  }
}
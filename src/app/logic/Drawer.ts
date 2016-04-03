module FlowEditor
{
  export class Drawer
  {
    static paintFilledRect(context:CanvasRenderingContext2D, rectangle:Rectangle, fillStyle:string, strokeStyle:string, shadowColor:string = "black"):void
    {
      context.save();
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowBlur = 3;
      context.shadowColor = shadowColor;
      context.fillStyle = fillStyle;
      context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      
      context.restore();
      context.strokeStyle = strokeStyle;
      context.lineWidth = 1;
      context.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
    
    static paintText(context:CanvasRenderingContext2D, text:string, position:Point, textStyle:string, shadowColor:string = "black"):void
    {
      context.save();
      context.font = "8.25pt Tahoma";
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.shadowBlur = 2;
      context.shadowColor = shadowColor;
      context.fillStyle = textStyle;
      context.lineWidth = 2;
      context.fillText(text, position.x, position.y);
    }
  }
}
module FlowEditor
{
  export interface ICanvasElement
  {
    paint(context:CanvasRenderingContext2D, theme:ITheme):void;
  }
}
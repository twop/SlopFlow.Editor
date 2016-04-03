module FlowEditor
{
  export interface IInteractive extends ICanvasElement
  {
    //isSelected:boolean;
    isHover:boolean;
    hitTest(point:Point):boolean;
  }
}
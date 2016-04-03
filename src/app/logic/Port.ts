module FlowEditor
{
  export class Port implements IInteractive
  {
    private _rectangle:Rectangle;
    private _textOffset:number = 5;
    public static size: number = 10;
    public portName:string;
    public isHover:boolean = false;

    public setCenter(x:number, y:number)
    {
      this._rectangle = new Rectangle(x - Port.size/2, y - Port.size/2, Port.size, Port.size);
    }
        
    constructor(name:string) 
    {
      this.portName = name;
    }
        
    public hitTest(point:Point):boolean
    {
      return this._rectangle.contains(point); 
    }
    
    paint(context:CanvasRenderingContext2D, theme:ITheme):void
    {
      var strokeStyle = this.isHover? theme.portBorderHover:  theme.portBorder;
      Drawer.paintFilledRect(context, this._rectangle, theme.port, strokeStyle);
      
      var position = new Point(this._rectangle.x + this._rectangle.width + this._textOffset, this._rectangle.y + Port.size-2)
      Drawer.paintText(context, this.portName, position, theme.portText);     
    }
  }
}
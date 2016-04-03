module FlowEditor
{
  export class Node implements IInteractive
  {
    private _rectangle:Rectangle;
    public isHover:boolean = false;
    private _inputs: Port[] = [];
    private _portOffset:number = 10;
    private _width = 100;
    private _name: string;
        
    constructor(position:Point, name:string) 
    {
      this._name = name; 
      
      var port1 = new Port("input1");
      var port2 = new Port("input2");
      this._inputs.push(port1);
      this._inputs.push(port2);
      
      this.moveTo(position);
    }
    
    public hitTest(point:Point):boolean
    {
      return this._rectangle.contains(point); 
    }
    
    public paint(context:CanvasRenderingContext2D, theme:ITheme):void
    {
      var strokeStyle = this.isHover? theme.nodeBorderHover:  theme.nodeBorder;
      Drawer.paintFilledRect(context, this._rectangle, theme.node, strokeStyle);
      this._inputs.forEach(input => { input.paint(context, theme) });
      
      var headerPos = this._rectangle.topLeft;
      headerPos.x += 5;
      headerPos.y -=5;
      
      //console.log("render " +  this._name + " isHover = " + this.isHover);
            
      Drawer.paintText(context, this._name, headerPos, theme.portText);  
    }
    
    public moveBy(deltaX:number, deltaY:number)
    {
      var leftTop = this._rectangle.topLeft;
      leftTop.x += deltaX;
      leftTop.y += deltaY;
      this.moveTo( leftTop);
    }
    
    private moveTo(leftTop:Point)
    {
      var y = leftTop.y + this._portOffset + Port.size/2;
      for (var index = 0; index < this._inputs.length; index++) 
      {
        var input = this._inputs[index];
        input.setCenter(leftTop.x, y );
        y +=  this._portOffset + Port.size;
      }
      y-= Port.size/2;
      
      this._rectangle = new Rectangle(leftTop.x, leftTop.y, this._width, y - leftTop.y);
    }
  }
}
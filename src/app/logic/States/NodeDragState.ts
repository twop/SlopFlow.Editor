 module FlowEditor
{
    export class NodeDragState implements IState
    { 
      private _lastMousePos:Point;
      private _node:Node;
      
      constructor(node:Node, mousePos:Point) 
      {
        this._lastMousePos = new Point(mousePos.x, mousePos.y);
        this._node = node;
      }
    
      mouseUp(mousePos:Point):boolean
      {
        return true;          
      }
      
      getCurrentCursor():string
      {
        return Cursors.drag;
      }
      
      mouseMove(mousePos:Point):boolean
      {
        this._node.moveBy(mousePos.x - this._lastMousePos.x, mousePos.y - this._lastMousePos.y);
        this._lastMousePos.x = mousePos.x;
        this._lastMousePos.y = mousePos.y;
        return false;  
      }
    }
}


module FlowEditor 
{
  export class Canvas 
  {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _pointerPosition: Point = new Point(0, 0);

    private _nodes: Node[] = [];
    private _theme: ITheme;
    private _currentState: IState = null;

    private _hoverObject: Node = null;

    private _mouseDownHandler: (e: MouseEvent) => void;
    private _mouseUpHandler: (e: MouseEvent) => void;
    private _mouseMoveHandler: (e: MouseEvent) => void;


    constructor(element: HTMLCanvasElement, theme: ITheme) 
    {
      this._theme = theme;
      this._canvas = element;
      
      var scale = this.devicePixelRatio;
      
      this._canvas.width = this._canvas.clientWidth * scale;
      this._canvas.height = this._canvas.clientHeight * scale;
      this._canvas.focus();
      this._context = this._canvas.getContext("2d");
      this._context.scale(scale, scale);

      this._mouseDownHandler = (e: MouseEvent) => { this.mouseDown(e); };
      this._mouseUpHandler = (e: MouseEvent) => { this.mouseUp(e); };
      this._mouseMoveHandler = (e: MouseEvent) => { this.mouseMove(e); };

      this._canvas.addEventListener("mousedown", this._mouseDownHandler, false);
      this._canvas.addEventListener("mouseup", this._mouseUpHandler, false);
      this._canvas.addEventListener("mousemove", this._mouseMoveHandler, false);
    }

    public dispose() 
    {
      if (this._canvas !== null) 
      {
        this._canvas.removeEventListener("mousedown", this._mouseDownHandler);
        this._canvas.removeEventListener("mouseup", this._mouseUpHandler);
        this._canvas.removeEventListener("mousemove", this._mouseMoveHandler);

        this._canvas = null;
        this._context = null;
      }
    }


    public addNode(node: Node): void 
    {
      this._nodes.push(node);
      this.update();
    }

    private get devicePixelRatio(): number 
    {
      return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1;
    }
    

    private mouseDown(e: MouseEvent) 
    {
      e.preventDefault();
      this._canvas.focus();
      this.updateMousePosition(e);

      if (this._hoverObject != null && this._currentState == null) 
      {
        this._currentState = new NodeDragState(this._hoverObject, this._pointerPosition);
        this.updateMouseCursor();
      }
    }

    private mouseUp(e: MouseEvent) 
    {
      e.preventDefault();
      this.updateMousePosition(e);

      if (this._currentState != null) 
      {
        if (this._currentState.mouseUp(this._pointerPosition)) 
        {
          this._currentState = null;
          this.updateMouseCursor();
        }

        this.update();
        return;
      }
    }

    private mouseMove(e: MouseEvent) 
    {
      e.preventDefault();
      this.updateMousePosition(e);

      if (this._currentState != null) 
      {
        if (this._currentState.mouseMove(this._pointerPosition)) 
        {
          this._currentState = null;
        }

        this.update();
        return;
      }

      var currentNode = null;
      for (var i: number = 0; i < this._nodes.length; i++) 
      {
        var node = this._nodes[i];
        node.isHover = node.hitTest(this._pointerPosition);

        if (node.isHover) 
        {
          currentNode = node;
        }
      }

      if (currentNode != this._hoverObject) 
      {
        console.log("current hover:" + currentNode );
        this._hoverObject = currentNode;
        this.update();
      }
    }

    
    private updateMouseCursor() 
    {
      if (this._currentState) 
      {
        this._canvas.style.cursor = this._currentState.getCurrentCursor();
        return;
      }

      this._canvas.style.cursor = this._hoverObject ? Cursors.hover : Cursors.default;
    }

    private updateMousePosition(e: MouseEvent) 
    {
      this._pointerPosition = new Point(e.clientX, e.clientY);
    }

    private update() 
    {
      this.updateMouseCursor();

      this._canvas.style.background = this._theme.background;
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

      for (var i: number = 0; i < this._nodes.length; i++) 
      {
        this._context.save();
        this._nodes[i].paint(this._context, this._theme);
        this._context.restore();
      }
    }
  }
}

module FlowEditor
{
    export interface IState
    { 
        //mouseDown(e: MouseEvent);
        mouseUp(mousePos:Point):boolean;
        mouseMove(mousePos:Point):boolean;
        getCurrentCursor():string;
    }
}
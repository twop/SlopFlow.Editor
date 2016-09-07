import {IInteractive} from './interactive'
import {Drawer} from './drawer'
import {Theme, Colors} from './theme'

import {Rectangle} from '../Model/rectangle'
import {Point} from '../Model/point'
import {Node} from '../Model/node'
import {Port} from '../Model/port'

export class NodeView implements IInteractive
{
  public isHover: boolean = false;
  private rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

  constructor(private center: Point, private theme: Theme, public node: Node) 
  {
    this.Invalidate();
  }

  public hitTest(point: Point): boolean
  {
    return this.rectangle.contains(point);
  }

  public paint(context: CanvasRenderingContext2D): void
  {
    var colors = this.theme.colors;

    var strokeStyle = this.isHover ? colors.nodeBorderHover : colors.nodeBorder;
    Drawer.paintRect(context, this.rectangle, strokeStyle);

    this.paintPorts(context, this.node.inputs, this.rectangle.x)
    this.paintPorts(context, this.node.outputs, this.rectangle.right)

    var headerX = this.rectangle.x + 5;
    var headerY = this.rectangle.y - 5;
    Drawer.paintText(context, this.node.name, headerX, headerY, this.theme.nodeFont, colors.portText);
  }

  public moveBy(deltaX: number, deltaY: number)
  {
    this.center.x += deltaX;
    this.center.y += deltaY;
    this.Invalidate();
  }

  public Invalidate(): void
  {
    this.rectangle.width = this.theme.nodeDefaultWidth;

    var portsCount = this.node.inputs.length;
    this.rectangle.height = this.theme.nodeDefaultHeight;
    this.rectangle.height += this.theme.portSize * portsCount;
    this.rectangle.height += this.theme.portInterval * (portsCount - 1);

    this.rectangle.x = this.center.x - this.rectangle.width / 2;
    this.rectangle.y = this.center.y - this.rectangle.height / 2;
  }

  private paintPorts(context: CanvasRenderingContext2D, ports: Port[], xpos: number)
  {
    var colors = this.theme.colors;

    var portRect = new Rectangle(
      xpos - this.theme.portSize / 2,
      this.rectangle.y + this.theme.nodeDefaultHeight / 2,
      this.theme.portSize,
      this.theme.portSize);

    ports.forEach(port => 
    {
      var portNameX = portRect.x;
      var portNameY = portRect.y - this.theme.portSize / 2;
      Drawer.paintText(context, port.name, portNameX, portNameY, this.theme.portFont, colors.portText);
      Drawer.paintFilledRect(context, portRect, colors.portBorder, colors.port);
      portRect.y += this.theme.portInterval + this.theme.portSize;
    });
  }
}
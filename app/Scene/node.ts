import {Port} from './port'
import {Rectangle} from '../Geometry/rectangle'
import {Sizes} from '../CanvasComponent/theme'

export class Node
{
  constructor(public name: string)
  { }

  public inputs = new Array<Port>();
  public outputs = new Array<Port>();

  public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

  addInput(port: Port): void
  {
    this.inputs.push(port);
  }

  addOutput(port: Port): void
  {
    this.outputs.push(port);
  }

  public moveBy(dx: number, dy: number)
  {
    this.rectangle.moveBy(dx, dy);

    this.inputs.forEach(port => port.rectangle.moveBy(dx, dy));
    this.outputs.forEach(port => port.rectangle.moveBy(dx, dy));
  }

  public recalculateSize(sizes: Sizes): void
  {
    this.rectangle.width = sizes.nodeDefaultWidth;

    var portsCount = Math.max(this.inputs.length, this.outputs.length);
    this.rectangle.height = sizes.nodeDefaultHeight;
    this.rectangle.height += sizes.portSize * portsCount;
    this.rectangle.height += sizes.portInterval * (portsCount - 1);

    this.alignPorts(this.inputs, this.rectangle.x, sizes);
    this.alignPorts(this.outputs, this.rectangle.right, sizes)
  }

  private alignPorts(ports: Port[], xpos: number, sizes: Sizes)
  {
    var y = this.rectangle.y + sizes.nodeDefaultHeight / 2;

    ports.forEach(port => 
    {
      port.setSizeAndCenter(xpos, y, sizes.portSize);
      y += sizes.portInterval + sizes.portSize;
    });
  }
}
import {Port} from './port'
import {Rectangle} from '../Geometry/rectangle'
import {Sizes} from '../Common/theme'
import {Size} from "../Geometry/size";

export class Node
{
  constructor(public name: string)
  { }

  public inputs = new Array<Port>();
  public outputs = new Array<Port>();

  public size: Size = new Size(0, 0);

  addInput(port: Port): void
  {
    this.inputs.push(port);
  }

  addOutput(port: Port): void
  {
    this.outputs.push(port);
  }


  public recalculateSize(sizes: Sizes): void
  {
    this.size.width = sizes.nodeDefaultWidth;

    var portsCount = Math.max(this.inputs.length, this.outputs.length);
    this.size.height = sizes.nodeDefaultHeight;
    this.size.height += sizes.portSize * portsCount;
    this.size.height += sizes.portInterval * (portsCount - 1);

    this.alignPorts(this.inputs, 0, sizes);
    this.alignPorts(this.outputs, this.size.width, sizes)
  }

  private alignPorts(ports: Port[], xpos: number, sizes: Sizes)
  {
    var y = sizes.nodeDefaultHeight / 2 + sizes.portSize/2;

    ports.forEach(port => 
    {
      port.setSizeAndCenter(xpos, y, sizes.portSize);
      y += sizes.portInterval + sizes.portSize;
    });
  }
}
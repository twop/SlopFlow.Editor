import {Node} from "../Model/node";
import {Point} from "../Geometry/point";
import {Port} from '../Model/port';
import {Sizes} from '../Common/theme';
import {Size} from '../Geometry/size';
import {PortInstance} from './portInstance';
import {IElementInstance} from './elementInstance';

export class NodeInstance implements IElementInstance
{
  constructor(public node: Node, private sizes: Sizes)
  {
    this.refresh();
  }

  public position: Point = new Point(0, 0);
  public size: Size = new Size(0, 0);

  public inputs = new Array<PortInstance>();
  public outputs = new Array<PortInstance>();

  public hover: boolean;
  public get modelObject(): Object {return this.node;}

  public refresh()
  {
    this.node.inputs.forEach(port => this.inputs.push(new PortInstance(port)))
    this.node.outputs.forEach(port => this.outputs.push(new PortInstance(port)))
    this.recalculateSize(this.sizes)
  }

  public moveBy(dx: number, dy: number)
  {
    this.position.moveBy(dx, dy);
  }

  public hitTest(point:Point):IElementInstance
  {
    //make it relative to the node
    point.subtract(this.position);

    var hoverObject:IElementInstance =
          this.hitTestPorts(this.inputs, point) ||
          this.hitTestPorts(this.outputs, point) ||
          this.hitTestNode(point);

    // return it back
    point.add(this.position);
    return hoverObject;
  }

  private hitTestNode(point: Point):IElementInstance
  {
    if((point.x >= 0) && (point.x <= this.size.width) && (point.y >= 0) && (point.y <= this.size.height))
      return this;
    
    return null;
  }

  private hitTestPorts(portInstances: PortInstance[], point: Point): IElementInstance
  {
    var hoverObject: IElementInstance = null;
    portInstances.forEach(portInstance =>
    {
      if (portInstance.rectangle.contains(point))
        hoverObject = portInstance;
    });

    return hoverObject;
  }

  private recalculateSize(sizes: Sizes): void
  {
    this.size.width = sizes.nodeDefaultWidth;

    var portsCount = Math.max(this.inputs.length, this.outputs.length);
    this.size.height = sizes.nodeDefaultHeight;

    this.size.height += sizes.portSize * portsCount;
    this.size.height += sizes.portInterval * (portsCount - 1);

    this.alignPorts(this.inputs, 0, sizes);
    this.alignPorts(this.outputs, this.size.width, sizes)
  }

  private alignPorts(ports: PortInstance[], xpos: number, sizes: Sizes)
  {
    var y = sizes.nodeDefaultHeight / 2 + sizes.portSize/2;

    ports.forEach(port =>
    {
      port.setSizeAndCenter(xpos, y, sizes.portSize);
      y += sizes.portInterval + sizes.portSize;
    });
  }

}

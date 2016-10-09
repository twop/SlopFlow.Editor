import {Point} from "../Geometry/point";
import {Sizes} from '../Common/theme';
import {Size} from '../Geometry/size';
import {PortSceneItem} from './portSceneItem';
import {ISceneItem, ModelObject} from './sceneItem';
import {INode} from '../Model/nodeInterface';

export class NodeSceneItem implements ISceneItem
{
  constructor(public node: INode, private sizes: Sizes)
  {
    this.refresh();
  }

  public position: Point = new Point(0, 0);
  public size: Size = new Size(0, 0);

  public inputs: PortSceneItem[] = [];
  public outputs: PortSceneItem[] = [];

  public hover: boolean;
  public get modelObject(): ModelObject {return this.node;}

  public refresh()
  {
    this.node.inputs.forEach(port => this.inputs.push(new PortSceneItem(port)))
    this.node.outputs.forEach(port => this.outputs.push(new PortSceneItem(port)))
    this.recalculateSize(this.sizes)
  }

  public moveBy(dx: number, dy: number)
  {
    this.position.moveBy(dx, dy);
  }

  public hitTest(point:Point):ISceneItem
  {
    //make it relative to the node
    point.subtract(this.position);

    var hoverObject:ISceneItem =
          this.hitTestPorts(this.inputs, point) ||
          this.hitTestPorts(this.outputs, point) ||
          this.hitTestNode(point);

    // return it back
    point.add(this.position);
    return hoverObject;
  }

  private hitTestNode(point: Point):ISceneItem
  {
    if((point.x >= 0) && (point.x <= this.size.width) && (point.y >= 0) && (point.y <= this.size.height))
      return this;
    
    return null;
  }

  private hitTestPorts(portInstances: PortSceneItem[], point: Point): ISceneItem
  {
    var hoverObject: ISceneItem = null;
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

  private alignPorts(ports: PortSceneItem[], xpos: number, sizes: Sizes)
  {
    var y = sizes.nodeDefaultHeight / 2 + sizes.portSize/2;

    ports.forEach(port =>
    {
      port.setSizeAndCenter(xpos, y, sizes.portSize);
      y += sizes.portInterval + sizes.portSize;
    });
  }

}

import {Node} from "./node";
import {Point} from "../Geometry/point";
import {Port} from './port';

export class ViewInstance
{
  constructor(public node: Node)
  {}

  public position: Point = new Point(0, 0);

  public moveBy(dx: number, dy: number)
  {
    this.position.moveBy(dx, dy);
  }

  public hitTest(point:Point):Object
  {
    //make it relative to the node
    point.subtract(this.position);

    var hoverObject:Object =
          this.hitTestPorts(this.node.inputs, point) ||
          this.hitTestPorts(this.node.outputs, point) ||
          this.hitTestNode(point);

    // return it back
    point.add(this.position);
    return hoverObject;
  }

  private hitTestNode(point: Point):Object
  {
    if((point.x >= 0) && (point.x <= this.node.size.width) && (point.y >= 0) && (point.y <= this.node.size.height))
      return this.node;
    
    return null;
  }

  private hitTestPorts(ports: Port[], point: Point): Object
  {
    var hoverObject: Object = null;
    ports.forEach(port =>
    {
      if (port.rectangle.contains(point))
        hoverObject = port;
    });

    return hoverObject;
  }

}

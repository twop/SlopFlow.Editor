import {Node} from "./node";
import {Point} from "../Geometry/point";

export class ViewInstance
{
  constructor(public node: Node)
  {}

  public position: Point = new Point(0, 0);

  public moveBy(dx: number, dy: number)
  {
    this.position.moveBy(dx, dy);
    //this.size.moveBy(dx, dy);
    // this.inputs.forEach(port => port.size.moveBy(dx, dy));
    // this.outputs.forEach(port => port.size.moveBy(dx, dy));
  }

}

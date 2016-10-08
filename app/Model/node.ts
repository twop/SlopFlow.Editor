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

  add(port: Port): void
  {
    if (port.isInput)
      this.inputs.push(port);
    else
      this.outputs.push(port);
  }
}
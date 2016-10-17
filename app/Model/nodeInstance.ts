import {INode} from './nodeInterface';
import {IPort} from './port';
import {Point} from '../Geometry/point';

export class NodeInstance implements INode
{
  constructor(public name: string, public node:INode)
  {
    this.Refresh();
  }

  inputs: IPort[];
  outputs: IPort[];

  position: Point = new Point(0,0);

  public Refresh():void
  {
    const wrapPort = (port: IPort) =>
    {
      return {name: port.name, dataType: port.dataType, isInput: port.isInput};
    };

    this.inputs = this.node.inputs.map(wrapPort);
    this.outputs = this.node.outputs.map(wrapPort);
  }
}
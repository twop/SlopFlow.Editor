import {INode} from './nodeInterface';
import {IPort} from './port';
import {Point} from '../geometry/point';

export class NodeInstance implements INode
{
  constructor(public name: string, public node:INode)
  {
    this.refresh();
  }

  inputs: IPort[];
  outputs: IPort[];

  position: Point = new Point(0,0);

  public refresh():void
  {
    const wrapPort = (port: IPort) =>
    {
      return {name: port.name, dataType: port.dataType, isInput: port.isInput};
    };

    this.inputs = this.node.inputs.map(wrapPort);
    this.outputs = this.node.outputs.map(wrapPort);
  }
}
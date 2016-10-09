import {INode} from './nodeInterface';
import {IPort} from './port';
import {DataType} from './dataType';

export class Node implements INode
{
  constructor(public name: string)
  { }

  public inputs: NodePort[] = [];
  public outputs: NodePort[] = [];

  add(port: NodePort): void
  {
    if (port.isInput)
      this.inputs.push(port);
    else
      this.outputs.push(port);
  }
}

export class NodePort implements IPort
{
  constructor(
    public name: string,
    public dataType: DataType,
    public isInput:boolean)
  { }
}
import {IPort} from './port';
import {DataType} from './dataType';
import {INode} from './nodeInterface';
import {NodeInstance} from './nodeInstance';

export class Flow implements INode
{
  constructor(public name:string)
  {}

  public inputs: FlowPort[] = [];
  public outputs: FlowPort[] = [];

  public nodes: NodeInstance[] = [];
  public links: PortLink[] = [];
}

export class FlowPort implements IPort
{
  constructor(
    public port:IPort,
    public name:string)
  {}

  get dataType(): DataType { return this.port.dataType }
  get isInput(): boolean { return this.port.isInput }
}

export class PortLink
{
  constructor(
    public fromNode: NodeInstance,
    public fromPort: IPort,
    public toNode: NodeInstance,
    public toPort: IPort)
  {}
}
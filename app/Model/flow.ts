import {IPort} from './port';
import {DataType} from './dataType';
import {INode} from './nodeInterface';

export class Flow implements INode
{
  constructor(public name:string)
  {}

  public inputs: FlowPort[] = [];
  public outputs: FlowPort[] = [];

  public items: INode[] = [];
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
    public from:IPort,
    public to:IPort)
  {}
}
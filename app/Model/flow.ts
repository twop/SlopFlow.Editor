import {Port} from './port';
import {NodeInstance} from '../Scene/nodeInstance';

export class Flow
{
  constructor(public name:string)
  {}

  public inputs = new Array<FlowExternalPort>();
  public outputs = new Array<FlowExternalPort>();

  public items = new Array<NodeInstance>();
  public links = new Array<PortLink>();
}

export class FlowExternalPort
{
  constructor(
    public port:Port,
    public name:string)
  {}
}

export class PortLink
{
  constructor(
    public from:Port,
    public to:Port)
  {}
}
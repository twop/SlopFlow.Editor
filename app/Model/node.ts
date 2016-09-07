import {Port} from './port'

export class Node
{
  public inputs = new Array<Port>();
  public outputs = new Array<Port>();

  constructor(public name:string)
  {
  }

  addInput(port:Port):void
  {
    this.inputs.push(port);
  }

  addOutput(port:Port):void
  {
    this.outputs.push(port);
  }
}
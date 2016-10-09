import {IPort} from './port';

export interface INode
{
  name: string;
  inputs: IPort[];
  outputs: IPort[];
}

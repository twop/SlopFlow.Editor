import {INode} from '../Model/nodeInterface';
import {IPort} from '../Model/port';

export type ModelObject = IPort | INode

export interface ISceneItem
{
  modelObject:ModelObject;
  hover:boolean;
}

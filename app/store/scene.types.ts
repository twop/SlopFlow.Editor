import {StateWithHistory} from 'redux-undo';
import {INode} from './node.types';
import {IDataType} from './dataType.types';
import { IFlow } from './flow.types';

export interface IScene
{
  selected: number;
  nodes: StateWithHistory<INode>[];
  flows: StateWithHistory<IFlow>[];
  types: IDataType[];
}

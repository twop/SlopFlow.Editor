import {StateWithHistory} from 'redux-undo';
import {INode} from './node.types';
import {IDataType} from './dataType.types';

export interface IScene
{
  selected: number;
  nodes: StateWithHistory<INode>[];
  types: IDataType[];
}

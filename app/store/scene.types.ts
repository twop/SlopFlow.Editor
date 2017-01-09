import { INode } from './node.types';
import { IDataType } from './dataType.types';
import { IFlow } from './flow.types';
import { History } from './undoable';

export interface IScene
{
  selected: number;
  nodes: History<INode>[];
  flows: History<IFlow>[];
  types: IDataType[];
}

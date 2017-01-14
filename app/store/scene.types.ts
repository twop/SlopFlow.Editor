import { IDataType } from './dataType.types';
import { IFlow } from './flow.types';
import { History } from './undoable';

export interface IScene
{
  selected: number;
  flows: History<IFlow>[];
  types: IDataType[];
}

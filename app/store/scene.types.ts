import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';
import {OrderedMap} from 'immutable'
import {StateWithHistory} from 'redux-undo';
import {INodeRecord} from './node.types';
import {intType, stringType, floatType, boolType, IDataTypeRecord, DataTypeFactory} from './dataType.types';

export interface IScene
{
  selected: number;
  nodes: OrderedMap<number, StateWithHistory<INodeRecord>>;
  types: OrderedMap<number, IDataTypeRecord>;
}
const initialScene: IScene =
        {
          selected: -1,
          nodes: OrderedMap<number, StateWithHistory<INodeRecord>>(),
          types: OrderedMap<number, IDataTypeRecord>([
            [intType.id, DataTypeFactory(intType)],
            [stringType.id, DataTypeFactory(stringType)],
            [floatType.id, DataTypeFactory(floatType)],
            [boolType.id, DataTypeFactory(boolType)]
          ])
        };

export interface ISceneRecord extends TypedRecord<ISceneRecord>, IScene {}
export const SceneFactory = makeTypedFactory<IScene, ISceneRecord>(initialScene);


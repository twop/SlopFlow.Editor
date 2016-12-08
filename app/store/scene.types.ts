import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';
import {List, OrderedMap} from 'immutable'

export interface IPort
{
  id: number;
  name: string;
}
export interface IPortRecord extends TypedRecord<IPortRecord>, IPort {}
export const PortFactory = makeTypedFactory<IPort, IPortRecord>({id:0, name:"newPort"});

export interface INode
{
  id: number;
  name: string;
  inputs: List<IPortRecord>
  outputs: List<IPortRecord>
}

const defaultNode: INode =
        {
          name: "newNode",
          id: 0,
          inputs: List<IPortRecord>(),
          outputs: List<IPortRecord>()
        };

export interface INodeRecord extends TypedRecord<INodeRecord>, INode {}
export const NodeFactory = makeTypedFactory<INode, INodeRecord>(defaultNode);

export interface IScene
{
  selected:number;
  nodes: OrderedMap<number,INodeRecord>;
}
const initialScene:IScene =
        {
          selected:-1,
          nodes: OrderedMap<number,INodeRecord>()
        };

export interface ISceneRecord extends TypedRecord<ISceneRecord>, IScene {}
export const SceneFactory = makeTypedFactory<IScene, ISceneRecord>(initialScene);


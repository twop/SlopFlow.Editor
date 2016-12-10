import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';
import {List} from 'immutable'

export interface IPort
{
  id: number;
  name: string;
  dataTypeId:number;
}
export interface IPortRecord extends TypedRecord<IPortRecord>, IPort {}
export const PortFactory = makeTypedFactory<IPort, IPortRecord>({id:0, name:"invalid Port", dataTypeId:0});

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
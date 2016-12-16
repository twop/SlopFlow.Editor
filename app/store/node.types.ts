import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';
import {List} from 'immutable'

export enum PortType
{
  Input,
  Output
}

export interface IPort
{
  readonly id: number;

  name: string;
  type: PortType;
  dataTypeId: number;
}

const defaultPort: IPort =
        {
          id: 0,
          name: "invalid Port",
          dataTypeId: 0,
          type: PortType.Input
        };

export interface IPortRecord extends TypedRecord<IPortRecord>, IPort {}
export const PortFactory = makeTypedFactory<IPort, IPortRecord>(defaultPort);

export interface INode
{
  readonly id: number;

  name: string;
  ports: List<IPortRecord>
}

const defaultNode: INode =
        {
          name: "newNode",
          id: 0,
          ports: List<IPortRecord>(),
        };

export interface INodeRecord extends TypedRecord<INodeRecord>, INode {}
export const NodeFactory = makeTypedFactory<INode, INodeRecord>(defaultNode);
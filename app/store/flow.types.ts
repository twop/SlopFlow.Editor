import {List, OrderedMap} from 'immutable';
import {IPort} from './node.types';

export enum FlowElementType
{
  Node,
  Flow
}

// TODO do we need to have an id as well?
export interface IElementPort extends IPort
{
  readonly originPortId: number;
}

export interface IElementLink
{
  readonly id:number;

  fromElementPortId: number;
  fromElementId: number;

  toElementPortId: number;
  toElementId: number;
}

export interface IElementToPortLink
{
  readonly id:number;

  elementPortId: number;
  elementId: number;

  flowPortId: number;
}

export interface IFlowElement
{
  readonly id: number;
  readonly originId: number;
  readonly type: FlowElementType;

  ports: List<IElementPort>;
}

export interface IFlow
{
  readonly id: number;

  elements: OrderedMap<number, IFlowElement>;
  elementLinks: List<IElementLink>;

  ports: List<IPort>;
  portLinks: List<IElementToPortLink>;
}

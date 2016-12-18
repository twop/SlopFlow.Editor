import {IPort} from './node.types';
import {Point} from '../geometry/point';

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

  position: Point;
  ports: IElementPort[];
}

export interface IFlow
{
  readonly id: number;

  elements: IFlowElement[];
  elementLinks: IElementLink[];

  ports: IPort[];
  portLinks: IElementToPortLink[];
}

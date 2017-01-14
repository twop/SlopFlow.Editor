import {Point} from '../geometry/point';

export enum ElementType
{
  Node,
  Flow
}

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

export interface IElementPort extends IPort
{
  readonly originPortId: number;
}

export interface IElementLink
{
  readonly id: number;

  fromElementPortId: number;
  fromElementId: number;

  toElementPortId: number;
  toElementId: number;
}

export interface IElementToPortLink
{
  readonly id: number;

  elementPortId: number;
  elementId: number;

  flowPortId: number;
}

export interface IFlowElement
{
  readonly id: number;
  readonly originId: number;
  readonly type: ElementType;

  name: string;
  position: Point;
  ports: IElementPort[];
}

export interface IFlow
{
  readonly type: ElementType.Flow;
  readonly id: number;

  name: string;

  elements: IFlowElement[];
  elementLinks: IElementLink[];

  ports: IPort[];
  portLinks: IElementToPortLink[];
}


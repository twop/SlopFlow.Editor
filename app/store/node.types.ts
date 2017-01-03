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

export interface INode
{
  readonly type: ElementType.Node;
  readonly id: number;

  name: string;
  ports: IPort[]
}



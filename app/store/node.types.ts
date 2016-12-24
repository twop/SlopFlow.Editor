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
  readonly id: number;

  name: string;
  ports: IPort[]
}



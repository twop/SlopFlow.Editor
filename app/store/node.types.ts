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

// const defaultPort: IPort =
//         {
//           id: 0,
//           name: "invalid Port",
//           dataTypeId: 0,
//           type: PortType.Input
//         };

export interface INode
{
  readonly id: number;

  name: string;
  ports: IPort[]
}



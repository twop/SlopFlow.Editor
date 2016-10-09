import {DataType} from './dataType';

export interface IPort
{
  name: string;
  dataType: DataType;
  isInput : boolean;
}

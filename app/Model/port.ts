import {DataType} from './dataType';

export class Port
{
  constructor(
    public name: string,
    public dataType: DataType,
    public isInput:boolean)
  { }
}
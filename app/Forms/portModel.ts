import {DataType} from '../Scene/dataType';
export class PortModel
{
  constructor(
    public name: string,
    public dataType: DataType,
    public isEditMode:boolean,
    public isInput:boolean)
  { }

  public toString = ()=> `{name=${this.name}, dataType=${this.dataType}}`;
}
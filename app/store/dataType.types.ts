// Nice file name btw.

import {TypedRecord, makeTypedFactory} from 'typed-immutable-record';
export interface IDataType
{
  id:number;
  name:string;
}

export const intType:IDataType = {id:-1, name:'int'};
export const stringType:IDataType = {id:-2, name:'string'};
export const boolType:IDataType = {id:-3, name:'boolean'};
export const floatType:IDataType = {id:-4, name:'float'};


export interface IDataTypeRecord extends TypedRecord<IDataTypeRecord>, IDataType {}
export const DataTypeFactory = makeTypedFactory<IDataType, IDataTypeRecord>({id:0, name:"nonexistent portType"});

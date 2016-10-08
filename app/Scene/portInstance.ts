import {Rectangle} from '../Geometry/rectangle'
import {DataType} from '../Model/dataType';
import {Port} from '../Model/port';
import {IElementInstance} from './elementInstance';

export class PortInstance implements IElementInstance
{
  constructor(public port: Port)
  { }

  public hover: boolean;
  public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

  public get modelObject(): Object {return this.port;}

  public setSizeAndCenter(centerX:number, centerY:number, size:number): void
  {
    this.rectangle.width = size;
    this.rectangle.height = size;

    this.rectangle.x = centerX - size/2;
    this.rectangle.y = centerY - size/2;
  }
}

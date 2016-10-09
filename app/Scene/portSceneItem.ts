import {Rectangle} from '../Geometry/rectangle'
import {ISceneItem, ModelObject} from './sceneItem';
import {IPort} from '../Model/port';

export class PortSceneItem implements ISceneItem
{
  constructor(public port: IPort)
  { }

  public hover: boolean;
  public rectangle: Rectangle = new Rectangle(0, 0, 0, 0);

  public get modelObject(): ModelObject {return this.port;}

  public setSizeAndCenter(centerX:number, centerY:number, size:number): void
  {
    this.rectangle.width = size;
    this.rectangle.height = size;

    this.rectangle.x = centerX - size/2;
    this.rectangle.y = centerY - size/2;
  }
}

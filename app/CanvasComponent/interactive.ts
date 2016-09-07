import {ICanvasElement} from './canvasElement'
import {Point} from '../Model/point'

export interface IInteractive extends ICanvasElement
{
  //isSelected:boolean;
  isHover: boolean;
  hitTest(point: Point): boolean;
}
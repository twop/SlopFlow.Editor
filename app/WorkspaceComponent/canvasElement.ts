import {Theme} from '../Common/theme'

export interface ICanvasElement
{
  paint(context: CanvasRenderingContext2D, theme: Theme): void;
}
import {Injectable} from '@angular/core'

@Injectable()
export class Theme
{
  public colors = new Colors();
  public sizes = new Sizes();
}

export class Sizes
{
  portFont: "14px Arial";
  portSize: number = 15;
  portInterval: number = 20;

  nodeFont = "16px Arial";
  nodeDefaultWidth: number = 100;
  nodeDefaultHeight: number = 50;
}

export class Colors
{
  background = "#1E1E1E";
  node = "white";
  nodeBorder = "#9FC5F8";
  nodeBorderHover = "white";
  port = "#FF4C4C";
  portBorder = "#7F2626";
  portBorderHover = "white";
  portText = "white";
  portTextHover = "white";
  portTextType = "#4EC9B0";
}
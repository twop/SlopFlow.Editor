import {Injectable} from '@angular/core'

import {Point} from '../Geometry/point'
import {Node} from '../Scene/node'
import {Port} from '../Scene/port'
import {Scene} from '../Scene/scene'

import {Theme} from "./theme";
import {Drawer} from "./drawer";

@Injectable()
export class SceneView
{
  constructor(private scene: Scene, private theme: Theme) 
  {
    var drawer = this;
    this.scene.updated.subscribe(() => drawer.drawScene());
  }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public setCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement)
  {
    this.canvas = canvas;
    this.context = context;

    this.drawScene();
  }

  private drawScene(): void
  {
    this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);

    if (this.scene.isInNodeEditMode)
    {
      this.drawNodeEditing();
    }
  }

  private drawNodeEditing(): void
  {
    var node = this.scene.selectedNode;
    if (node)
    {
      this.context.save();

      //TODO this is a hack. do it properly      
      node.rectangle.x = 20;
      node.rectangle.y = 20;
      node.recalculateSize(this.theme.sizes);

      this.drawNode(node);
      this.context.restore();
    }
  }

  public drawNode(node:Node, atPosition:Point = null): void
  {
    var colors = this.theme.colors;

    var isHover = false;

    var strokeStyle = isHover ? colors.nodeBorderHover : colors.nodeBorder;
    Drawer.paintRect(this.context, node.rectangle, strokeStyle);

    this.paintPorts(this.context, node.inputs);
    this.paintPorts(this.context, node.outputs);

    var headerX = node.rectangle.x + 5;
    var headerY = node.rectangle.y - 5;
    Drawer.paintText(this.context, node.name, headerX, headerY, this.theme.sizes.nodeFont, colors.portText);
  }

  private paintPorts(context: CanvasRenderingContext2D, ports: Port[])
  {
    var colors = this.theme.colors;
    var sizes = this.theme.sizes;

    ports.forEach(port => 
    {
      var portNameX = port.rectangle.x;
      var portNameY = port.rectangle.y - sizes.portSize / 2;
      Drawer.paintText(context, port.name, portNameX, portNameY, sizes.portFont, colors.portText);
      Drawer.paintFilledRect(context, port.rectangle, colors.portBorder, colors.port);
    });
  }
}
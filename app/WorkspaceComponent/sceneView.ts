import {Injectable} from '@angular/core'

import {Point} from '../Geometry/point'
import {Node} from '../Scene/node'
import {Port} from '../Scene/port'
import {Scene} from '../Scene/scene'

import {Theme} from "./theme";
import {Drawer} from "./drawer";
import {Workspace} from '../Scene/workspace';
import {Rectangle} from '../Geometry/rectangle';

@Injectable()
export class SceneView
{
  constructor(private scene: Scene, private theme: Theme) 
  {
    var sceneView = this;
    this.scene.activeWorkspaceChanged.subscribe((workspace) => sceneView.drawScene());
    this.scene.workspaceModified.subscribe((workspace) => sceneView.drawScene());
  }

  private drawer:Drawer = new Drawer();
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  public setCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement):void
  {
    this.canvas = canvas;
    this.context = context;

    this.drawScene();
  }

  private drawScene(): void
  {
    this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
    this.drawWorkspace(this.scene.activeWorkspace);
  }

  public drawNode(node:Node): void
  {
    var colors = this.theme.colors;

    var isHover = false;

    var strokeStyle = isHover ? colors.nodeBorderHover : colors.nodeBorder;
    this.drawer.paintRect(this.context, Rectangle.fromSize(node.size), strokeStyle);

    this.paintPorts(this.context, node.inputs);
    this.paintPorts(this.context, node.outputs);

    var headerX = 5;
    var headerY = - 5;
    this.drawer.paintText(this.context, node.name, headerX, headerY, this.theme.sizes.nodeFont, colors.portText);
  }

  private paintPorts(context: CanvasRenderingContext2D, ports: Port[]):void
  {
    var colors = this.theme.colors;
    var sizes = this.theme.sizes;

    ports.forEach(port => 
    {
      var portNameX = port.rectangle.x;
      var portNameY = port.rectangle.y - sizes.portSize / 2;
      this.drawer.paintText(context, port.name, portNameX, portNameY, sizes.portFont, colors.portText);
      this.drawer.paintFilledRect(context, port.rectangle, colors.portBorder, colors.port);
    });
  }

  private drawWorkspace(workspace: Workspace):void
  {
    if (!workspace)
      return;

    this.drawer.offset = workspace.viewNode.position;

    this.context.save();
    this.drawNode(workspace.node);
    this.context.restore();
  }
}
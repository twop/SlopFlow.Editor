import {Injectable} from '@angular/core'

import {Node} from '../Scene/node'
import {Port} from '../Scene/port'
import {Scene} from '../Scene/scene'

import {Theme} from "../Common/theme";
import {Drawer} from "./drawer";
import {Workspace} from '../Scene/workspace';
import {Rectangle} from '../Geometry/rectangle';
import {Point} from '../Geometry/point';
import {NodeEventService} from '../Common/nodeEvent.service';
import {NodeEditing} from './Behaviors/nodeEditing';

@Injectable()
export class SceneView
{
  constructor(private scene: Scene, private theme: Theme, private eventService: NodeEventService)
  {
    var sceneView = this;
    this.scene.activeWorkspaceChanged.subscribe((workspace) => sceneView.onWorkspaceChanged(workspace));
    this.scene.workspaceModified.subscribe((workspace) => sceneView.drawScene());
  }

  private workspace:Workspace = null;
  private nodeEditing:NodeEditing;
  private drawer:Drawer = null;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public hoverElement: Object = null;

  public setCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement):void
  {
    this.canvas = canvas;
    this.context = context;

    this.drawer = new Drawer(context);

    canvas.addEventListener("mousedown", (e: MouseEvent) => {this.mouseDown(e)}, false);
    canvas.addEventListener("mouseup", (e: MouseEvent) => {this.mouseUp(e)}, false);
    canvas.addEventListener("mousemove", (e: MouseEvent) => {this.mouseMove(e)}, false);
    canvas.addEventListener("touchstart", (e: TouchEvent) => {this.touchStart(e)}, false);
    canvas.addEventListener("touchend", (e: TouchEvent) => {this.touchEnd(e)}, false);
    canvas.addEventListener("touchmove", (e: TouchEvent) => {this.touchMove(e)}, false);
    canvas.addEventListener("dblclick", (e: MouseEvent) => {this.doubleClick(e)}, false);
    canvas.addEventListener("keydown", (e: KeyboardEvent) => {this.keyDown(e)}, false);
    canvas.addEventListener("keypress", (e: KeyboardEvent) => {this.keyPress(e)}, false);
    canvas.addEventListener("keyup", (e: KeyboardEvent) => {this.keyUp(e)}, false);

    this.drawScene();
  }

  private onWorkspaceChanged(workspace:Workspace)
  {
    this.workspace = workspace;
    if (workspace)
      this.nodeEditing = new NodeEditing(workspace, this.eventService);
    else
      this.nodeEditing = null;

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

    var strokeStyle = this.hoverElement == node ? colors.nodeBorderHover : colors.nodeBorder;
    this.drawer.paintRect(Rectangle.fromSize(node.size), strokeStyle);

    this.paintPorts(node.inputs);
    this.paintPorts(node.outputs);

    var headerX = 5;
    var headerY = - 5;
    this.drawer.paintText(node.name, headerX, headerY, this.theme.sizes.nodeFont, colors.node);
  }

  private paintPorts(ports: Port[]):void
  {
    var colors = this.theme.colors;
    var sizes = this.theme.sizes;

    ports.forEach(port =>
    {
      var hover = this.hoverElement == port;
      var portNameX = port.rectangle.x;
      var portNameY = port.rectangle.y - sizes.portSize / 2;

      var portTextColor = !hover ? colors.portText : colors.portTextHover;
      var textWidth = this.drawer.measureTextWidth(port.name, sizes.portFont);
      this.drawer.paintText(port.name, portNameX, portNameY, sizes.portFont, portTextColor);
      this.drawer.paintText(`:${port.dataType.name}`, portNameX + textWidth, portNameY, sizes.portFont, colors.portTextType);

      var strokeStyle = hover ? colors.portBorderHover : colors.portBorder;
      this.drawer.paintFilledRect(port.rectangle, strokeStyle, colors.port);
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

  private mouseDown(e: MouseEvent)
  {
    if (!this.workspace)
      return;

    this.hoverElement = this.workspace.viewNode.hitTest(this.getMousePosition(e));
    if (this.hoverElement && this.nodeEditing)
      this.nodeEditing.mouseDownOn(this.hoverElement);

    this.drawScene();
  }

  private mouseUp(e: MouseEvent) {}

  private mouseMove(e: MouseEvent): void
  {
    if (!this.workspace)
      return;

    this.hoverElement = this.workspace.viewNode.hitTest(this.getMousePosition(e));
    this.drawScene();
  }

  private doubleClick(e: MouseEvent): void {}

  private touchStart(e: TouchEvent): void {}

  private touchEnd(e: TouchEvent): void {}

  private touchMove(e: TouchEvent): void {}

  private keyDown(e: KeyboardEvent): void {}

  private keyPress(e: KeyboardEvent): void {}

  private keyUp(e: KeyboardEvent): void {}


  private getMousePosition(e: MouseEvent): Point
  {
    var pointerPosition = new Point(e.pageX, e.pageY);
    var node: HTMLElement = this.canvas;
    while (node !== null)
    {
      pointerPosition.x -= node.offsetLeft;
      pointerPosition.y -= node.offsetTop;
      node = <HTMLElement> node.offsetParent;
    }

    return pointerPosition;
  }
}
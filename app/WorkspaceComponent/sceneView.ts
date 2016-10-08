import {Injectable} from '@angular/core'

import {Node} from '../Model/node'
import {Port} from '../Model/port'
import {Scene} from '../Scene/scene'

import {Theme} from "../Common/theme";
import {Drawer} from "./drawer";
import {Workspace} from '../Scene/workspace';
import {Rectangle} from '../Geometry/rectangle';
import {Point} from '../Geometry/point';
import {NodeEventService} from '../Common/nodeEvent.service';
import {NodeEditing} from './Behaviors/nodeEditing';
import {NodeInstance} from '../Scene/nodeInstance';
import {PortInstance} from '../Scene/portInstance';
import {IElementInstance} from '../Scene/elementInstance';

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
  private behavior:NodeEditing;
  private drawer:Drawer = null;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  public hoverElement: IElementInstance = null;

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
      this.behavior = new NodeEditing(workspace, this.eventService);
    else
      this.behavior = null;

    this.drawScene();
  }

  private drawScene(): void
  {
    this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);
    this.drawWorkspace(this.scene.activeWorkspace);
  }

  public drawNode(nodeInstance:NodeInstance): void
  {
    var colors = this.theme.colors;

    var strokeStyle = nodeInstance.hover ? colors.nodeBorderHover : colors.nodeBorder;
    this.drawer.paintRect(Rectangle.fromSize(nodeInstance.size), strokeStyle);

    this.paintPorts(nodeInstance.inputs);
    this.paintPorts(nodeInstance.outputs);

    var headerX = 5;
    var headerY = - 5;
    this.drawer.paintText(nodeInstance.node.name, headerX, headerY, this.theme.sizes.nodeFont, colors.node);
  }

  private paintPorts(portInstances: PortInstance[]):void
  {
    var colors = this.theme.colors;
    var sizes = this.theme.sizes;

    portInstances.forEach(portInstance =>
    {
      var portNameX = portInstance.rectangle.x;
      var portNameY = portInstance.rectangle.y - sizes.portSize / 2;

      var portTextColor = !portInstance.hover ? colors.portText : colors.portTextHover;
      var portName = portInstance.port.name;
      var textWidth = this.drawer.measureTextWidth(portName, sizes.portFont);
      this.drawer.paintText(portName, portNameX, portNameY, sizes.portFont, portTextColor);
      this.drawer.paintText(`:${portInstance.port.dataType.name}`, portNameX + textWidth, portNameY, sizes.portFont, colors.portTextType);

      var strokeStyle = portInstance.hover ? colors.portBorderHover : colors.portBorder;
      this.drawer.paintFilledRect(portInstance.rectangle, strokeStyle, colors.port);
    });
  }

  private drawWorkspace(workspace: Workspace):void
  {
    if (!workspace)
      return;

    this.drawer.offset = workspace.nodeInstance.position;

    this.context.save();
    this.drawNode(workspace.nodeInstance);
    this.context.restore();
  }

  private mouseDown(e: MouseEvent)
  {
    if (!this.workspace)
      return;

    var newHoverElement = this.workspace.nodeInstance.hitTest(this.getMousePosition(e));
    this.updateHoverElement(newHoverElement);

    if (this.hoverElement && this.behavior)
      this.behavior.mouseDownOn(this.hoverElement);

    this.drawScene();
  }

  private updateHoverElement(newHoverElement: IElementInstance)
  {
    if (this.hoverElement != newHoverElement)
    {
      this.hoverElement && (this.hoverElement.hover = false);
      newHoverElement && (newHoverElement.hover = true);

      this.hoverElement = newHoverElement;
    }
  }

  private mouseUp(e: MouseEvent) {}

  private mouseMove(e: MouseEvent): void
  {
    if (!this.workspace)
      return;

    var newHoverElement = this.workspace.nodeInstance.hitTest(this.getMousePosition(e));
    this.updateHoverElement(newHoverElement);
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
    var htmlElement: HTMLElement = this.canvas;
    while (htmlElement !== null)
    {
      pointerPosition.x -= htmlElement.offsetLeft;
      pointerPosition.y -= htmlElement.offsetTop;
      htmlElement = <HTMLElement> htmlElement.offsetParent;
    }

    return pointerPosition;
  }
}
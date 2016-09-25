import {AfterViewInit, Component, ViewChild} from "@angular/core";

import {Scene} from "../Scene/scene";
import {SceneView} from './sceneView'

import { NodeEventService } from '../Common/node-event.service';
import {Workspace} from '../Scene/workspace';
import {NewPortRequest} from '../Common/newPortEvent';


@Component({
  selector: `my-workspace`,
  styleUrls: ['app/WorkspaceComponent/workspace.component.css'],
  templateUrl: 'app/WorkspaceComponent/workspace.component.html',
  providers:[SceneView]
})

export class WorkspaceComponent implements AfterViewInit
{
  @ViewChild("myCanvas") myCanvas;

  private canvas: HTMLCanvasElement = null;

  constructor(private scene:Scene, private sceneView: SceneView, private eventService: NodeEventService)
  {
    //this.scene.activeWorkspaceChanged.subscribe(() => sceneView.drawScene());
  }

  ngAfterViewInit()
  {
    this.canvas = this.myCanvas.nativeElement;

    this.canvas.width = this.canvas.clientWidth * this.devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * this.devicePixelRatio;

    var context = this.canvas.getContext("2d");
    context.scale(this.devicePixelRatio, this.devicePixelRatio);

    this.sceneView.setCanvas(context, this.canvas);
  }

  public get workspace():Workspace
  {
    return this.scene.activeWorkspace;
  }

  public requestNewPort(): void
  {
    this.eventService.requestNewPort.emit( new NewPortRequest("new port", this.workspace));
  }

  public undo():void
  {
    this.workspace && this.workspace.undo();
  }

  public redo():void
  {
    this.workspace && this.workspace.redo();
  }

  private get devicePixelRatio(): number
  {
    return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1;
  }
}

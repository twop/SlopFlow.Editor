import {AfterViewInit, Component, ViewChild} from "@angular/core";

import {Scene} from "../Scene/scene";
import {SceneView} from './sceneView'

import { NodeEventService } from '../Common/node-event.service';


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
  { }

  ngAfterViewInit()
  {
    this.canvas = this.myCanvas.nativeElement;

    this.canvas.width = this.canvas.clientWidth * this.devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * this.devicePixelRatio;

    var context = this.canvas.getContext("2d");
    context.scale(this.devicePixelRatio, this.devicePixelRatio);

    this.sceneView.setCanvas(context, this.canvas);
  }

  requestNewPort(): void
  {
    this.eventService.requestNewPort.emit("new port");
  }

  public get devicePixelRatio(): number
  {
    return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1;
  }
}

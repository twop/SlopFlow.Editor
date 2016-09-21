import {AfterViewInit, Component, ViewChild, EventEmitter} from "@angular/core";

import {Scene} from "../Model/scene";
import {Point} from "../Model/point";
import {Node} from "../Model/node";
import {Port} from "../Model/port";

import {Theme} from "./theme";
import {SceneView} from './sceneView'

import { NodeEventService } from '../Common/node-event.service';


@Component({
  selector: `my-canvas`,
  styleUrls: ['app/CanvasComponent/canvas.component.css'],
  templateUrl: 'app/CanvasComponent/canvas.component.html',
  providers:[SceneView]
})

export class CanvasComponent implements AfterViewInit
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

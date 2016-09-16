import {AfterViewInit, Component, ViewChild, EventEmitter} from "@angular/core";

import {Scene} from "../Model/scene";
import {Point} from "../Model/point";
import {Node} from "../Model/node";
import {Port} from "../Model/port";

import {Theme} from "./theme";
import {NodeView} from "./nodeView";

import { NodeEventService } from '../Common/node-event.service';


@Component({
  selector: `my-canvas`,
  styleUrls: ['app/CanvasComponent/canvas.component.css'],
  templateUrl: 'app/CanvasComponent/canvas.component.html',
})

export class CanvasComponent implements AfterViewInit
{
  context: CanvasRenderingContext2D;
  @ViewChild("myCanvas") myCanvas;

  private canvas: any = null;
  private nodeView: NodeView = null;

  constructor(
    private scene: Scene,
    private theme: Theme,
    private eventService: NodeEventService)
  {
    var canvasComponent = this;
    scene.selectedNodeChanged.subscribe(function (n) { canvasComponent.onSelectedNodeChanged(n); });
  }

  ngAfterViewInit()
  {
    this.canvas = this.myCanvas.nativeElement;
    this.context = this.canvas.getContext("2d");

    //this.tick();
  }

  addPort(): void
  {
    this.eventService.requestNewPort.emit("new port");
    this.update();
  }

  private onSelectedNodeChanged(node: Node): void
  {
    if (node)
    {
      this.nodeView = new NodeView(new Point(100, 100), this.theme, node);
    }
    else
    {
      this.nodeView = null;
    }

    this.update();
  }

  update()
  {
    this.context.clearRect(0, 0, this.canvas.scrollWidth, this.canvas.scrollHeight);

    if (this.nodeView)
    {
      this.nodeView.Invalidate();
      this.context.save();
      this.nodeView.paint(this.context);
      this.context.restore();
    }
  }
}

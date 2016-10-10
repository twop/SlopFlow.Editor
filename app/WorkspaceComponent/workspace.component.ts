import {AfterViewInit, Component, ViewChild} from "@angular/core";

import {Scene} from "../Scene/scene";
import {SceneView} from './sceneView'

import { NodeEventService } from '../Common/nodeEvent.service';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NewPortRequest} from '../Common/portEvents';
import {Workspace} from '../Scene/workspace';
import {NodeToolbarComponent} from './nodeToolbar.component';


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

  constructor(private scene:Scene, private sceneView: SceneView)
  {
    //this.scene.activeWorkspaceChanged.subscribe(() => sceneView.drawScene());
  }

  public get isNode():boolean
  {
    return this.scene.activeWorkspace instanceof NodeWorkspace;
  }

  public get nodeWorkspace(): NodeWorkspace
  {
    return this.scene.activeWorkspace as NodeWorkspace;
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

  private get devicePixelRatio(): number
  {
    return (('devicePixelRatio' in window) && (window.devicePixelRatio > 1)) ? window.devicePixelRatio : 1;
  }
}

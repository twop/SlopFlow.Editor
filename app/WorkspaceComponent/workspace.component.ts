import {Component} from "@angular/core";

import {Scene} from "../Scene/scene";
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {FlowWorkspace} from '../Scene/flowWorkspace';
import {Toolbar, ToolbarItem, ToolbarIcons} from '../Scene/toolbar';

@Component({
  selector: `my-workspace`,
  styleUrls: [`app/WorkspaceComponent/flowStyles.css`],
  templateUrl: 'app/WorkspaceComponent/workspace.component.html',
})

export class WorkspaceComponent
{
  constructor(private scene:Scene)
  {
    //this.scene.activeWorkspaceChanged.subscribe(() => sceneView.drawScene());
  }

  public get isNode():boolean
  {
    return this.scene.activeWorkspace instanceof NodeWorkspace;
  }

  public get isFlow():boolean
  {
    return this.scene.activeWorkspace instanceof FlowWorkspace;
  }

  public get activeWorkspaceName()
  {
    return this.scene.activeWorkspace && this.scene.activeWorkspace.name;
  }

  public get nodeWorkspace(): NodeWorkspace
  {
    return this.scene.activeWorkspace as NodeWorkspace;
  }

  public get flowWorkspace(): FlowWorkspace
  {
    return this.scene.activeWorkspace as FlowWorkspace;
  }
}

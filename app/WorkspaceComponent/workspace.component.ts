import {Component} from "@angular/core";

import {Scene} from "../Scene/scene";
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {FlowWorkspace} from '../Scene/flowWorkspace';
import {Toolbar, ToolbarItem, Glyphicons} from '../Scene/toolbar';

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

    const toolbarItem = new ToolbarItem("test", ()=> console.log("test"), true, Glyphicons.delete);
    const toolbarItem1 = new ToolbarItem("test1", ()=> console.log("test1"), true, Glyphicons.edit);
    const toolbarItem2 = new ToolbarItem("test2", ()=> console.log("test2"), true, Glyphicons.delete);
    this.toolbar.items.push(toolbarItem, toolbarItem1, toolbarItem2);
  }

  public toolbar:Toolbar = new Toolbar();

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

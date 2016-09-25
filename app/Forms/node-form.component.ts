import { Component } from '@angular/core';
import { NodeModel }  from './node-model';

import { NodeEventService } from '../Common/node-event.service';
import { Scene } from '../Scene/scene';
import { NewNodeCommand } from '../Scene/Commands/newNodeCommand';
import { Node } from '../Scene/node';
import {EditNodeCommand} from '../Scene/Commands/editNodeCommand';
import {Workspace} from '../Scene/workspace';

@Component({
  selector: 'node-form',
  templateUrl: 'app/Forms/node-form.component.html'
})

export class NodeFormComponent
{
  constructor(private scene: Scene, nodeEventService: NodeEventService)
  {
    var formComponent = this;
    scene.activeWorkspaceChanged.subscribe(()=> formComponent.onCancel());
    nodeEventService.requestNewNode.subscribe((name) => formComponent.showCreateNodeForm(name));
    nodeEventService.requestEditNode.subscribe((workspace) => formComponent.showEditNodeForm(workspace));
  }

  public model: NodeModel = null;
  public workspace:Workspace;

  public get hasModel(): boolean
  {
    return this.model != null;
  }

  public onSubmit(): void
  {
    if (this.model.isEditMode)
      this.scene.executeCommand(new EditNodeCommand(this.workspace, this.model));
    else
      this.scene.executeCommand(new NewNodeCommand(this.model));

    this.resetModel();
  }

  public onCancel(): void
  {
    this.resetModel();
  }

  private resetModel()
  {
    this.model = null;
    this.workspace = null;
  }

  private showCreateNodeForm(nodeName: string): void
  {
    this.model = new NodeModel(nodeName, false);
  }

  private showEditNodeForm(workspace:Workspace): void
  {
    this.workspace = workspace;
    this.model = new NodeModel(workspace.node.name, true);
  }
}

import {Component, Input} from '@angular/core';
import {NodeModel}  from './nodeModel';

import {Scene} from '../Scene/scene';
import {NewNodeCommand} from '../Scene/Commands/newNodeCommand';
import {EditNodeCommand} from '../Scene/Commands/editNodeCommand';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'node-form',
  templateUrl: 'app/Forms/nodeForm.component.html'
})

export class NodeFormComponent
{
  constructor(public activeModal: NgbActiveModal)
  {
  }

  public model: NodeModel = null;
  public workspace: NodeWorkspace;

  private scene: Scene;

  public openCreateNode(scene: Scene, nodeName: string): void
  {
    this.scene = scene;
    this.model = new NodeModel(nodeName, false);
  }

  public openEditNode(scene: Scene, workspace: NodeWorkspace): void
  {
    this.scene = scene;
    this.workspace = workspace;
    this.model = new NodeModel(workspace.node.name, true);
  }

  public onSubmit(): void
  {
    if (this.model.isEditMode)
      this.scene.executeCommand(new EditNodeCommand(this.workspace, this.model));
    else
      this.scene.executeCommand(new NewNodeCommand(this.model));

    this.resetModel();
    this.activeModal.close('submitted');
  }

  public onCancel(): void
  {
    this.resetModel();
    this.activeModal.close('Close click');
  }

  private resetModel()
  {
    this.model = null;
    this.workspace = null;
  }


}

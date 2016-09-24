import { Component } from '@angular/core';
import { NodeModel }    from './node-model';

import { NodeEventService } from '../Common/node-event.service';
import { Scene } from '../Scene/scene';
import { NewNodeCommand } from '../Scene/Commands/newNodeCommand';


@Component({
  selector: 'node-form',
  templateUrl: 'app/Forms/node-form.component.html'
})

export class NodeFormComponent
{
  constructor(private scene: Scene, nodeEventService: NodeEventService)
  {
    var formComponent = this;
    nodeEventService.requestNewNode.subscribe((name) => { formComponent.showCreateNodeForm(name); });
  }

  model: NodeModel = null;

  onSubmit(): void
  {
    this.scene.executeCommand(new NewNodeCommand(this.model));
    this.model = null;
  }

  onCancel(): void
  {
    this.model = null;
  }

  private showCreateNodeForm(nodeName: string): void
  {
    this.model = new NodeModel(nodeName);
  }

  get hasModel(): boolean 
  {
    return this.model != null;
  }
}

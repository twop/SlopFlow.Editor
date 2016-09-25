import { Component } from '@angular/core';
import { PortModel }    from './port-model';

import { NodeEventService } from '../Common/node-event.service';
import { NewPortCommand } from '../Scene/Commands/newPortCommand';

import { Scene } from '../Scene/scene';
import { Port } from '../Scene/port';
import {Workspace} from '../Scene/workspace';
import {NewPortRequest} from '../Common/newPortEvent';


@Component({
  selector: 'port-form',
  templateUrl: 'app/Forms/port-form.component.html'
})

export class PortFormComponent
{
  constructor(private scene: Scene, nodeEventService: NodeEventService)
  {
    var formComponent = this;

    scene.activeWorkspaceChanged.subscribe(()=> this.onCancel());

    nodeEventService.requestNewPort.subscribe(( request: NewPortRequest) =>
    {
      formComponent.workspace = request.workspace;
      formComponent.showCreatePortForm(request.name);
    });
  }

  public model: PortModel = null;

  private workspace:Workspace = null;

  public onSubmit(): void
  {
    var port = new Port(this.model.name, "new type");
    this.workspace.executeCommand(new NewPortCommand(port, true));
    this.model = null;
  }

  public onCancel(): void
  {
    this.model = null;
    this.workspace = null;
  }

  public get hasModel(): boolean
  {
    return this.model != null;
  }

  private showCreatePortForm(nodeName: string): void
  {
    this.model = new PortModel(nodeName);
  }
}

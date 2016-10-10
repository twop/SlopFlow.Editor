import { Component } from '@angular/core';
import { PortModel }    from './portModel';

import { NodeEventService } from '../Common/nodeEvent.service';
import { NewPortCommand } from '../Scene/Commands/newPortCommand';

import { Scene } from '../Scene/scene';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NewPortRequest, EditPortRequest} from '../Common/portEvents';
import {EditPortCommand} from '../Scene/Commands/editPortCommand';
import {DefaultTypes, DataType} from '../Model/dataType';
import {NodePort} from '../Model/node';

@Component({
  selector: 'port-form',
  templateUrl: 'app/Forms/portForm.component.html'
})

export class PortFormComponent
{
  constructor(private scene: Scene, nodeEventService: NodeEventService)
  {
    var formComponent = this;

    scene.activeWorkspaceChanged.subscribe(()=> this.onCancel());

    nodeEventService.requestNewPort.subscribe(( request: NewPortRequest) =>
    {
      formComponent.workspace = request.nodeWorkspace;
      formComponent.showCreatePortForm(request.name);
    });

    nodeEventService.requestEditPort.subscribe(( request: EditPortRequest) =>
    {
      formComponent.workspace = request.nodeWorkspace;
      formComponent.showEditPortForm(request.port);
    });
  }

  public model: PortModel = null;

  private workspace:NodeWorkspace = null;
  private port:NodePort = null;

  public get dataTypes():DataType[]
  {
    return DefaultTypes.all;
  }

  public onSubmit(): void
  {
    if (this.model.isEditMode)
    {
      this.workspace.executeCommand(new EditPortCommand(this.port, this.model));
    }
    else
    {
      var port = new NodePort(this.model.name, this.model.dataType, this.model.isInput);
      this.workspace.executeCommand(new NewPortCommand(port));
    }

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
    this.port = null;
  }

  public get hasModel(): boolean
  {
    return this.model != null;
  }

  private showCreatePortForm(nodeName: string): void
  {
    this.model = new PortModel(nodeName, DefaultTypes.float, false, true);
  }

  private showEditPortForm(port:NodePort): void
  {
    this.port = port;
    this.model = new PortModel(port.name, port.dataType, true, port.isInput);
  }
}

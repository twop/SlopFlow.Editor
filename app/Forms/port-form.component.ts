import { Component } from '@angular/core';
import { PortModel }    from './port-model';

import { NodeEventService } from '../Common/node-event.service';
import { NewPortCommand } from '../Scene/Commands/newPortCommand';

import { Scene } from '../Scene/scene';
import { Port } from '../Scene/port';


@Component({
  selector: 'port-form',
  templateUrl: 'app/Forms/port-form.component.html'
})

export class PortFormComponent
{
  constructor(private scene: Scene, nodeEventService: NodeEventService)
  {
    var formComponent = this;
    nodeEventService.requestNewPort.subscribe((name) => { formComponent.showCreatePortForm(name); });
  }

  model: PortModel = null;

  onSubmit(): void
  {
    var port = new Port(this.model.name, "new type");
    this.scene.executeCommand(new NewPortCommand(port, true));
    this.model = null;
  }

  onCancel(): void
  {
    this.model = null;
  }

  private showCreatePortForm(nodeName: string): void
  {
    this.model = new PortModel(nodeName);
  }

  get hasModel(): boolean 
  {
    return this.model != null;
  }
}

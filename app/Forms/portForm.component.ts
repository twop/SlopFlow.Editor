import {Component} from '@angular/core';
import { PortModel }    from './portModel';

import { NewPortCommand } from '../Scene/Commands/newPortCommand';

import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {EditPortCommand} from '../Scene/Commands/editPortCommand';
import {DefaultTypes, DataType} from '../Model/dataType';
import {NodePort} from '../Model/node';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'port-form',
  templateUrl: 'app/Forms/portForm.component.html'
})
export class PortFormComponent
{
  constructor(public activeModal: NgbActiveModal)
  {
  }

  public model: PortModel = null;

  private workspace:NodeWorkspace = null;
  private port:NodePort = null;

  public openNewPort(nodeName: string, workspace:NodeWorkspace): void
  {
    this.workspace = workspace;
    this.model = new PortModel(nodeName, DefaultTypes.float, false, true);
  }

  public openEditPort(port:NodePort, workspace:NodeWorkspace): void
  {
    this.port = port;
    this.workspace = workspace;

    this.model = new PortModel(port.name, port.dataType, true, port.isInput);
  }

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
    this.port = null;
  }
}

import {Component, Input} from '@angular/core';
import {NodeModel}  from './nodeModel';

import {Scene} from '../Scene/scene';
import {NewNodeCommand} from '../Scene/Commands/newNodeCommand';
import {EditNodeCommand} from '../Scene/Commands/editNodeCommand';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NewFlowCommand} from '../Scene/Commands/newFlowCommand';

@Component({
  templateUrl: 'app/Forms/flowForm.component.html'
})
export class FlowFormComponent
{
  constructor(public activeModal: NgbActiveModal)
  {}

  private scene: Scene;
  private flowName: string;

  public openCreateFlow(scene: Scene, flowName: string): void
  {
    this.scene = scene;
    this.flowName = flowName;
  }


  public onSubmit(): void
  {
    this.scene.executeCommand(new NewFlowCommand(this.flowName));
    this.activeModal.close('submitted');
  }

  public onCancel(): void
  {
    this.activeModal.close('Close click');
  }

}

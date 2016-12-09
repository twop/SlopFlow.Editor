import {Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort} from '../Model/node';
import {PortFormComponent} from './portForm.component';
import {NodeFormComponent} from './nodeForm.component';
import {Scene} from '../Scene/scene';
import {FlowFormComponent} from './flowForm.component';

@Injectable()
export class ModalService
{
  constructor(private modalService: NgbModal) {}

  public open<TComponent>(type: { new(activeModal: NgbActiveModal): TComponent }, initFunc?: (component: TComponent) => void): void
  {
    const component: TComponent = this.modalService.open(type).componentInstance;
    if (initFunc)
      initFunc(component);
  }

  public openEditPortDialog(port: NodePort, nodeWorkspace: NodeWorkspace): void
  {
    const component: PortFormComponent = this.modalService.open(PortFormComponent).componentInstance;
    component.openEditPort(port, nodeWorkspace);
  }

  public openNewPortDialog(name: string, nodeWorkspace: NodeWorkspace): void
  {
    const component: PortFormComponent = this.modalService.open(PortFormComponent).componentInstance;
    component.openNewPort(name, nodeWorkspace);
  }

  public openEditNodeDialog(scene: Scene, nodeWorkspace: NodeWorkspace): void
  {
    const component: NodeFormComponent = this.modalService.open(NodeFormComponent).componentInstance;
    component.openEditNode(scene, nodeWorkspace);
  }

  public openNewNodeDialog(scene: Scene, name: string): void
  {
    const component: NodeFormComponent = this.modalService.open(NodeFormComponent).componentInstance;
    component.openCreateNode(scene, name);
  }

  public openNewFlowDialog(scene: Scene, name: string): void
  {
    const component: FlowFormComponent = this.modalService.open(FlowFormComponent).componentInstance;
    component.openCreateFlow(scene, name);
  }
}

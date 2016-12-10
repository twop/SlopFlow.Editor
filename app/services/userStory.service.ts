import {Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SceneActions} from '../actions/scene.actions';
import {NodeActions} from '../actions/node.actions';
import {NgRedux} from 'ng2-redux';
import {PortDialogComponent, IPortModel} from '../dialogs/portDialog.component';
import {IDataType} from '../store/dataType.types';
import {NodeDialogComponent, INodeModel} from '../dialogs/nodeDialog.component';
import {IAppState} from '../store/store';
import {INode, IPort} from '../store/node.types';
import {ModalDialog} from '../dialogs/modalDialog';

type DialogComponent<T extends ModalDialog<TModel>, TModel> = { new(activeModal: NgbActiveModal): T };

interface IModalSettings<T extends ModalDialog<TResult>, TResult>
{
  type: DialogComponent<T, TResult>;
  init?: (component: T) => void;
  onResult?: (result: TResult) => void;
}

@Injectable()
export class UserStoryService
{
  constructor(
    private modalService: NgbModal,
    private sceneActions: SceneActions,
    private nodeActions: NodeActions,
    private ngRedux: NgRedux<IAppState>)
  {}

  private openModal<T extends ModalDialog<TResult>, TResult>(settings: IModalSettings<T, TResult>): void
  {
    const modalRef: NgbModalRef = this.modalService.open(settings.type);
    const component: T = modalRef.componentInstance;

    const reportResult = (res) =>
    {
      console.log(`dialog result:`);
      console.log(res);

      if (res)
      {
        settings.onResult(res);
      }
    };

    const reportFailure = (reason) =>
    {
      if (reason)
      {
        console.log('dialog failed:');
        console.log(reason);
      }
    };

    if (settings.init)
      settings.init(component);

    modalRef.result
      .then(reportResult)
      .catch(reportFailure);
  }

  public createNode(): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) => d.createNode("newNode"),
        onResult: (model : INodeModel) => this.sceneActions.newNode(model.name)
      });
  }

  public renameNode(node: INode): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) => d.editNode(node),
        onResult: (model : INodeModel) => this.nodeActions.rename(node.id, model.name)
      });
  }

  public createPort(nodeId: number): void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types.toArray();

    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.createPort("newPort", dataTypes),
        onResult: (portModel: IPortModel) => this.nodeActions.newPort(portModel, nodeId)
      });
  }

  public editPort(port: IPort, nodeId: number): void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types.toArray();

    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.editPort(port, dataTypes),
        onResult: (portModel: IPortModel) => this.nodeActions.editPort(portModel, port.id, nodeId)
      });
  }
}

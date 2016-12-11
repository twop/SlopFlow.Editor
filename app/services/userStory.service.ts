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
import {ConfirmatioDialogComponent, IConfirmation} from '../dialogs/confirmatioDialog.component';
import {UiTexts} from '../components/ui.texts';
import {ToolbarIcons} from '../Scene/toolbar';

type DialogComponent<T extends ModalDialog<TModel>, TModel> = { new(activeModal: NgbActiveModal): T };

interface IModalSettings<T extends ModalDialog<TResult>, TResult>
{
  type: DialogComponent<T, TResult>;
  init?: (component: T) => void;
  onSuccess?: (result: TResult) => void;
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
        settings.onSuccess(res);
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
        onSuccess: (model: INodeModel) => this.sceneActions.newNode(model.name)
      });
  }

  public renameNode(node: INode): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) => d.editNode(node),
        onSuccess: (model: INodeModel) => this.nodeActions.rename(node.id, model.name)
      });
  }

  public createPort(nodeId: number): void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types.toArray();

    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.createPort("newPort", dataTypes),
        onSuccess: (portModel: IPortModel) => this.nodeActions.newPort(portModel, nodeId)
      });
  }

  public editPort(port: IPort, nodeId: number): void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types.toArray();

    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.editPort(port, dataTypes),
        onSuccess: (portModel: IPortModel) => this.nodeActions.editPort(portModel, port.id, nodeId)
      });
  }

  public deletePort(port: IPort, nodeId: number): void
  {
    const confirmation: IConfirmation =
            {
              title: UiTexts.deleteDialogTitle(port.name),
              buttonIcon: ToolbarIcons.delete,
              buttonText: UiTexts.deleteButtonText,
              text: UiTexts.deleteDialogText,
              buttonStyle: 'btn-danger'
            };

    this.openModal(
      {
        type: ConfirmatioDialogComponent,
        init: (d) => d.showConfirmation(confirmation),
        onSuccess: (result: any) => this.nodeActions.deletePort(port.id, nodeId)
      });
  }
}

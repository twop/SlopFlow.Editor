import {Injectable} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SceneActions} from '../actions/scene.actions';
import {NodeActions} from '../actions/node.actions';
import {NgRedux} from 'ng2-redux';
import {PortDialogComponent, IPortModel} from '../dialogs/portDialog.component';
import {IDataType} from '../store/dataType.types';
import {NodeDialogComponent} from '../dialogs/nodeDialog.component';
import {IAppState} from '../store/store';
import {INode, IPort} from '../store/node.types';
import {ModalDialog} from '../dialogs/modalDialog';
import {ConfirmatioDialogComponent, IConfirmation} from '../dialogs/confirmatioDialog.component';
import {UiTexts} from '../components/ui.texts';
import {ToolbarIcons} from './toolbar';
import { FlowActions } from '../actions/flow.actions';
import { IFlow } from '../store/flow.types';

type DialogComponent<T extends ModalDialog<TModel>, TModel> = { new(activeModal: NgbActiveModal): T };

interface IModalSettings<T extends ModalDialog<TResult>, TResult>
{
  type: DialogComponent<T, TResult>;
  init?: (component: T) => void;
  onSuccess?: (result: TResult) => void;
}

@Injectable()
export class DialogService
{
  constructor(
    private modalService: NgbModal,
    private sceneActions: SceneActions,
    
    private ngRedux: NgRedux<IAppState>)
  {}

  private openModal<T extends ModalDialog<TResult>, TResult>(settings: IModalSettings<T, TResult>): void
  {
    const modalRef: NgbModalRef = this.modalService.open(settings.type);
    const component: T = modalRef.componentInstance;

    const reportResult = (res) =>
    {
      console.log(`dialog result:`, res);

      if (res)
      {
        settings.onSuccess(res);
      }
    };

    const reportFailure = (reason) =>
    {
      if (reason)
      {
        console.log('dialog failed:', reason);
      }
    };

    if (settings.init)
      settings.init(component);

    modalRef.result
      .then(reportResult)
      .catch(reportFailure);
  }

  public createNode(onSuccess: (model: string) => void): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) =>
        { 
          d.title = UiTexts.dialogTitle_RenameNode;
          d.model = 'node';
        },
        //onSuccess: (model: string) => this.sceneActions.newNode(model)
        onSuccess
      });
  }

  public renameNode(nodeName: string, onSuccess: (model: string) => void): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) =>
        { 
          d.title = UiTexts.dialogTitle_RenameNode;
          d.model = nodeName;
        },
        onSuccess
      });
  }

  public renameFlow(flowName:string, onSuccess: (model: string) => void): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) =>
        { 
          d.title = UiTexts.dialogTitle_RenameFlow;
          d.model = flowName;
        },
        onSuccess
      });
  }

  public createFlow(onSuccess: (model: string)=>void): void
  {
    this.openModal(
      {
        type: NodeDialogComponent,
        init: (d) =>
        { 
          d.title = UiTexts.dialogTitle_CreateFlow
          d.model = 'flow';
        },
        onSuccess
        // onSuccess: (model: string) => this.sceneActions.newFlow(model)
      });
  }

  public createPort(onSuccess: (portModel: IPortModel)=>void): void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types;

    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.createPort("newPort", dataTypes),
        //onSuccess: (portModel: IPortModel) => this.nodeActions.newPort(portModel, nodeId)
        onSuccess
      });
  }

  public editPort(port: IPort, onSuccess: (portModel: IPortModel) => void): void
  {
    const dataTypes: Array<IDataType> = this.ngRedux.getState().scene.types;

    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.editPort(port, dataTypes),
        onSuccess
      });
  }

  public deletePort(portName: string, onConfirmed:()=>void): void
  {
    const confirmation: IConfirmation =
            {
              title: UiTexts.deleteDialogTitle(portName),
              buttonIcon: ToolbarIcons.delete,
              buttonText: UiTexts.deleteButtonText,
              text: UiTexts.deleteDialogText,
              buttonStyle: 'btn-danger'
            };

    this.openModal(
      {
        type: ConfirmatioDialogComponent,
        init: (d) => d.showConfirmation(confirmation),
        //onSuccess: (result: any) => this.nodeActions.deletePort(port.id, nodeId)
        onSuccess: onConfirmed
      });
  }
}

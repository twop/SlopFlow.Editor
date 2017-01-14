import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SceneActionCreators } from '../actions/scene.actions';
import { PortDialogComponent, IPortModel } from '../dialogs/portDialog.component';
import { IDataType } from '../store/dataType.types';
import { IAppState } from '../store/store';
import { ModalDialog } from '../dialogs/modalDialog';
import { ConfirmatioDialogComponent, IConfirmation } from '../dialogs/confirmatioDialog.component';
import { UiTexts } from '../components/ui.texts';
import { ToolbarIcons } from './toolbar';
import { FlowActionCreators } from '../actions/flow.actions';
import { IFlow, IPort } from '../store/flow.types';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take'
import { NodeDialogComponent } from '../dialogs/nodeDialog.component';

type DialogComponent<T extends ModalDialog<TModel>, TModel> = { new (activeModal: NgbActiveModal): T };

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
    private store: Store<IAppState>)
  { }

  private getTypes(): IDataType[]
  {
    let state: IAppState;
    this.store.take(1).subscribe(s => state = s);
    return state.scene.types;
  }

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

 

  public renameFlow(flowName: string, onSuccess: (model: string) => void): void
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

  public createFlow(onSuccess: (model: string) => void): void
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
      });
  }

  public createPort(onSuccess: (portModel: IPortModel) => void): void
  {
    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.createPort("newPort", this.getTypes()),
        onSuccess
      });
  }

  public editPort(port: IPort, onSuccess: (portModel: IPortModel) => void): void
  {
    this.openModal(
      {
        type: PortDialogComponent,
        init: (d) => d.editPort(port, this.getTypes()),
        onSuccess
      });
  }

  public deletePort(portName: string, onConfirmed: () => void): void
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
        onSuccess: onConfirmed
      });
  }
}

import {Component, Input} from '@angular/core';
import {Log} from '../../services/log';
import {IFlowLayout} from '../../services/layout.service';
import { Toolbar, ToolbarItem, ToolbarIcons } from '../../services/toolbar';
import { IPortModel } from '../../dialogs/portDialog.component';
import { FlowActionCreators, FlowAction } from '../../actions/flow.actions';
import { ContextToolbarService } from '../../services/contextToolbar.service';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/store';
import { IPort } from '../../store/flow.types';

@Component({
    selector: 'g[flow-workspace]',
    styleUrls: ['app/components/workspace/workspace.css'],
    templateUrl: 'app/components/workspace/flowWorkspace.component.html'
})
export class FlowWorkspaceComponent
{
   constructor(
    private toolbarService: ContextToolbarService,
    private actions: FlowActionCreators,
    private dialogs: DialogService,
    private store: Store<IAppState>,
    private log: Log
  )
  { }

  @Input() layout:  IFlowLayout = null;

  public onPortClicked(elementId:number, port:IPort)
  {
    this.log.debug(`clicked on ${port.name} in element: Id{${elementId}}`);
    //this.toolbarService.newToolbarEvent.emit(portToolbar);
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onElementClicked(elementId:number)
  {
    this.log.debug(`clicked on element: Id{${elementId}}`);
    //this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }

  public buildPortToolbar(port: IPort): Toolbar
  {
    const flowId: number = this.layout.flowId;

    const dispatch = (action: FlowAction) => this.store.dispatch(action);

    return new Toolbar(
      port.name,
      new ToolbarItem(
        "Edit",
        () => this.dialogs.editPort(port, (model: IPortModel) =>
          dispatch(this.actions.editPort(model, port.id, flowId))),
        ToolbarIcons.edit),

      new ToolbarItem(
        "Delete",
        () => this.dialogs.deletePort(port.name, () =>
          dispatch(this.actions.deletePort(port.id, flowId))),
        ToolbarIcons.delete));
  }
}
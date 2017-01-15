import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from '../../services/log';
import { IFlowLayout } from '../../services/layout.service';
import { Toolbar, ToolbarItem, ToolbarIcons } from '../../services/toolbar';
import { IPortModel } from '../../dialogs/portDialog.component';
import { flowActionCreators, FlowAction } from '../../actions/flow.actions';
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
    private dialogs: DialogService,
    private store: Store<IAppState>,
    private log: Log
  )
  { }

  @Input() layout: IFlowLayout = null;
  @Input() contextToolbar: EventEmitter<Toolbar> = null;

  public onElementPortClicked(elementId: number, port: IPort)
  {
    this.log.debug(`clicked on ${port.name} in element: Id{${elementId}}`);
    //this.contextToolbar$.emit(this.buildPortToolbar(port, this.layout.flowId));
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onFlowPortClicked(port: IPort)
  {
    this.log.debug(`clicked on flow port ${port.name}`);
    this.contextToolbar.emit(this.buildPortToolbar(port, this.layout.flowId));
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onElementClicked(elementId: number)
  {
    this.log.debug(`clicked on element: Id{${elementId}}`);
    //this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }

  public buildPortToolbar(port: IPort, flowId:number): Toolbar
  {
    const dispatch = (action: FlowAction) => this.store.dispatch(action);

    const {editPort, deletePort} = flowActionCreators;

    const edit: ToolbarItem =
      {
        name: "Edit",
        action: () => this.dialogs.editPort(port, (model: IPortModel) => dispatch(editPort(model, port.id, flowId))),
        icon: ToolbarIcons.edit
      };

    const del: ToolbarItem =
      {
        name: "Delete",
        action: () => this.dialogs.deletePort(port.name, () => dispatch(deletePort(port.id, flowId))),
        icon: ToolbarIcons.delete
      };

    return new Toolbar(port.name, [edit, del]);
  }
}
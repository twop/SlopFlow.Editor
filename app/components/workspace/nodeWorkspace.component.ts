import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { INodeViewState } from './nodeViewState';
import { ContextToolbarService } from '../../services/contextToolbar.service';
import { INodeLayout } from '../../services/layout.service';
import { IPort } from '../../store/node.types';
import { DialogService } from '../../services/dialog.service';
import { Toolbar, ToolbarItem, ToolbarIcons } from '../../services/toolbar';
import { NodeActionCreators, NodeAction } from '../../actions/node.actions';
import { IPortModel } from '../../dialogs/portDialog.component';
import { IAppState } from '../../store/store';

@Component({
  selector: 'g[node-workspace]',
  template: ` 
    <svg:g *ngIf="layout" node-component [layout]="layout" [viewState]="nodeViewState"
      (portClick)="onPortClicked($event)"/>`
})
export class NodeWorkspaceComponent
{
  constructor(
    private toolbarService: ContextToolbarService,
    private actions: NodeActionCreators,
    private dialogs: DialogService,
    private store: Store<IAppState>
  )
  { }

  @Input()
  layout: INodeLayout;

  public nodeViewState: INodeViewState<IPort> = {
    nodeIsSelectable: false,
    selectedObject: null
  };

  public onPortClicked(port: IPort)
  {
    this.nodeViewState.selectedObject = port;
    //console.log(`port clicked: ${port.name}`);

    const portToolbar: Toolbar = this.buildPortToolbar(port);
    this.toolbarService.newToolbarEvent.emit(portToolbar);
  }

  public buildPortToolbar(port: IPort): Toolbar
  {
    const nodeId: number = this.layout.id;

    const dispatch = (action: NodeAction) => this.store.dispatch(action);

    return new Toolbar(
      port.name,
      new ToolbarItem(
        "Edit",
        () => this.dialogs.editPort(port, (model: IPortModel) =>
          dispatch(this.actions.editPort(model, port.id, nodeId))),
        ToolbarIcons.edit),

      new ToolbarItem(
        "Delete",
        () => this.dialogs.deletePort(port.name, () =>
          dispatch(this.actions.deletePort(port.id, nodeId))),
        ToolbarIcons.delete));
  }
}

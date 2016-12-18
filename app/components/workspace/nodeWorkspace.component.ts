import { Component, Input } from '@angular/core';
import {INodeViewState} from '../../WorkspaceComponent/nodeViewState';
import {ContextToolbarService} from '../../Scene/contextToolbar.service';
import {INodeLayout} from '../../services/layout.service';
import {IPort} from '../../store/node.types';
import {UserStoryService} from '../../services/userStory.service';
import {Toolbar, ToolbarItem, ToolbarIcons} from '../../Scene/toolbar';

@Component({
    selector: 'g[node-rworkspace]',
    template: ` 
    <svg:g *ngIf="layout" node-rcomponent [layout]="layout" [viewState]="nodeViewState"
      (portClick)="onPortClicked($event)"/>`
})
export class RNodeWorkspaceComponent
{
  constructor(
    private toolbarService:ContextToolbarService,
    private userStoryService: UserStoryService
  )
  {}

  @Input()
  layout:INodeLayout;

  public nodeViewState:INodeViewState<IPort> = {
    nodeIsSelectable: false,
    selectedObject: null
  };

  public onPortClicked(port:IPort)
  {
    this.nodeViewState.selectedObject = port;
    //console.log(`port clicked: ${port.name}`);

    const portToolbar: Toolbar = this.buildPortToolbar(port);
    this.toolbarService.newToolbarEvent.emit(portToolbar);
  }

  public buildPortToolbar (port: IPort): Toolbar
  {
    const nodeId: number = this.layout.id;

    return new Toolbar(
      port.name,
      new ToolbarItem("Edit", () => this.userStoryService.editPort(port, nodeId), ToolbarIcons.edit),
      new ToolbarItem("Delete", () => this.userStoryService.deletePort(port, nodeId), ToolbarIcons.delete));
  }
}

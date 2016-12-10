import { Component, Input } from '@angular/core';
import {INodeViewState} from '../../WorkspaceComponent/nodeViewState';
import {ContextToolbarService} from '../../Scene/contextToolbar.service';
import {INodeLayout} from '../../services/layout.service';
import {IPort} from '../../store/node.types';
import {UserStoryService} from '../../services/userStory.service';

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
    //this.nodeViewState.selectedObject = port;
    this.userStoryService.editPort(port, this.layout.node.id);
    console.log(`port clicked: ${port.name}`);

    //const portToolbar: Toolbar = this.nodeWorkspace.buildPortToolbar(port);
    //this.toolbarService.newToolbarEvent.emit(portToolbar);
  }
}

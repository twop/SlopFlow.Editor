import { Component, Input } from '@angular/core';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort, Node} from '../Model/node';
import {NodeEventService} from '../Common/nodeEvent.service';
import {EditPortRequest} from '../Common/portEvents';
import {Point} from '../Geometry/point';
import {Log} from '../LogComponent/log';
import {INode} from '../Model/nodeInterface';
import {INodeViewState} from './nodeViewState';
import {ContextToolbarService} from '../Scene/contextToolbar.service';
import {Toolbar} from '../Scene/toolbar';

@Component({
    selector: 'g[node-workspace]',
    template: `
    <svg:g node-component [layout]="nodeWorkspace.layout" [viewState]="nodeViewState"
      (portClick)="onPortClicked($event)"/>`
})
export class NodeWorkspaceComponent
{
  constructor(private toolbarService:ContextToolbarService)
  {}

  @Input()
  nodeWorkspace:NodeWorkspace;

  public nodeViewState:INodeViewState<NodePort> = {
    nodeIsSelectable: false,
    selectedObject: null
  };

  public onPortClicked(port:NodePort)
  {
    this.nodeViewState.selectedObject = port;
    console.log(`selection: ${port.name}`);

    const portToolbar: Toolbar = this.nodeWorkspace.buildPortToolbar(port);
    this.toolbarService.newToolbarEvent.emit(portToolbar);
  }
}

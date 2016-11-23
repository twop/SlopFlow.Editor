import { Component, Input } from '@angular/core';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort, Node} from '../Model/node';
import {NodeEventService} from '../Common/nodeEvent.service';
import {EditPortRequest} from '../Common/portEvents';
import {Point} from '../Geometry/point';
import {Log} from '../LogComponent/log';
import {INode} from '../Model/nodeInterface';
import {INodeViewState} from './nodeViewState';

export type SelectionType = Node | NodePort;

@Component({
    selector: 'g[node-workspace]',
    template: `
    <svg:g node-component [layout]="nodeWorkspace.layout" [viewState]="nodeViewState"
      (portClick)="onPortClicked($event)"
      (nodeClick)="onNodeClicked($event)"/>`
})
export class NodeWorkspaceComponent
{
  constructor(private eventService: NodeEventService)
  {
  }

  @Input()
  nodeWorkspace:NodeWorkspace;

  public nodeViewState:INodeViewState<SelectionType> = {
    nodeIsSelectable: false,
    selectedObject: null
  };

  public onPortClicked(port:NodePort)
  {
    this.nodeViewState.selectedObject = port;
    console.log(`selection: ${port.name}`);
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onNodeClicked(node:Node)
  {
    console.log(`selection: ${node.name}`);
    this.nodeViewState.selectedObject = node;
    //this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }



}

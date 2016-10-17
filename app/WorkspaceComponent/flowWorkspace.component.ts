import { Component, Input } from '@angular/core';
import {FlowWorkspace} from '../Scene/flowWorkspace';
import {NodeInstance} from '../Model/nodeInstance';
import {IPort} from '../Model/port';
import {INode} from '../Model/nodeInterface';
import {Log} from '../LogComponent/log';

@Component({
    moduleId: module.id,
    selector: 'g[flow-workspace]',
    templateUrl: 'flowWorkspace.component.html'
})
export class FlowWorkspaceComponent
{
  constructor(private log:Log) { }

  @Input()
  public flowWorkspace:FlowWorkspace;

  public getNodeInstances = () :  NodeInstance[] => this.flowWorkspace.flow.nodes;

  public onPortClicked(node:INode, port:IPort)
  {
    this.log.debug(`clicked on ${port.name} in ${node.name}`);
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onNodeClicked(node:INode)
  {
    this.log.debug(`clicked on ${node.name}`);
    //this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }
}
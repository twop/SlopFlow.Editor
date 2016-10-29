import {Component, Input} from '@angular/core';
import {FlowWorkspace} from '../Scene/flowWorkspace';
import {IPort} from '../Model/port';
import {INode} from '../Model/nodeInterface';
import {Log} from '../LogComponent/log';
import {IFlowLayout} from './layout.service';

@Component({
    selector: 'g[flow-workspace]',
    styleUrls: ['app/WorkspaceComponent/flowStyles.css'],
    templateUrl: 'app/WorkspaceComponent/flowWorkspace.component.html'
})
export class FlowWorkspaceComponent
{
  constructor(private log:Log)
  {}

  @Input()
  public flowWorkspace:FlowWorkspace;

  public get layout () :  IFlowLayout {return this.flowWorkspace.layout;}

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
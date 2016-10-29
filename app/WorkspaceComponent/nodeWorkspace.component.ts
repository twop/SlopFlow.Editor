import { Component, Input } from '@angular/core';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort, Node} from '../Model/node';
import {NodeEventService} from '../Common/nodeEvent.service';
import {EditPortRequest} from '../Common/portEvents';
import {Point} from '../Geometry/point';
import {Log} from '../LogComponent/log';

@Component({
    selector: 'g[node-workspace]',
    templateUrl: 'app/WorkspaceComponent/nodeWorkspace.component.html'
})
export class NodeWorkspaceComponent
{
  constructor(private eventService: NodeEventService)
  {
  }

  @Input()
  nodeWorkspace:NodeWorkspace;

  public onPortClicked(port:NodePort)
  {
    this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onNodeClicked(node:Node)
  {
    this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }

}

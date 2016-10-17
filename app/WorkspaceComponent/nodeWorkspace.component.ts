import { Component, Input } from '@angular/core';
import {NodeWorkspace} from '../Scene/nodeWorkspace';
import {NodePort, Node} from '../Model/node';
import {NodeEventService} from '../Common/nodeEvent.service';
import {EditPortRequest} from '../Common/portEvents';
import {Point} from '../Geometry/point';

@Component({
    moduleId: module.id,
    selector: 'g[node-workspace]',
    templateUrl: 'nodeWorkspace.component.html'
})
export class NodeWorkspaceComponent
{
  constructor(private eventService: NodeEventService)
  {
  }

  @Input()
  nodeWorkspace:NodeWorkspace;

  public offset = new Point(10,15);
  
  public onPortClicked(port:NodePort)
  {
    this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onNodeClicked(node:Node)
  {
    this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }

}

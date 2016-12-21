import {Component, Input} from '@angular/core';
import {Log} from '../../LogComponent/log';
import {IPort} from '../../store/node.types';
import {IFlowLayout} from '../../services/layout.service';

@Component({
    selector: 'g[flow-rworkspace]',
    styleUrls: ['app/components/workspace/workspace.css'],
    templateUrl: 'app/components/workspace/flowWorkspace.component.html'
})
export class RFlowWorkspaceComponent
{
  constructor(private log:Log)
  {}

  @Input() layout:  IFlowLayout = null;

  public onPortClicked(elementId:number, port:IPort)
  {
    this.log.debug(`clicked on ${port.name} in element: Id{${elementId}}`);
    //this.eventService.requestEditPort.emit( new EditPortRequest(port, this.nodeWorkspace));
  }

  public onElementClicked(elementId:number)
  {
    this.log.debug(`clicked on element: Id{${elementId}}`);
    //this.eventService.requestEditNode.emit( this.nodeWorkspace);
  }
}
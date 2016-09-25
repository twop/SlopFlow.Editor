import {Node} from '../../Scene/node';
import {Port} from '../../Scene/port';
import {NodeEventService} from '../../Common/node-event.service';
import {EditPortRequest} from '../../Common/portEvents';
import {Workspace} from '../../Scene/workspace';

export class NodeEditing
{
  constructor(private workspace:Workspace, private eventService: NodeEventService)
  {}

  public mouseDownOn(element:Object):void
  {
    if (element instanceof Node)
    {
      this.eventService.requestEditNode.emit( this.workspace);
    }
    else if (element instanceof Port)
    {
      this.eventService.requestEditPort.emit( new EditPortRequest(element, this.workspace));
    }
  }
}
